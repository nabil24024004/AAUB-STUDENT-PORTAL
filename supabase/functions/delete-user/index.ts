// @ts-nocheck — This is a Deno/Supabase Edge Function, not a Node.js file.
// IDE errors here are expected since the project uses Vite's TS config.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const clerkWebhookSecret = Deno.env.get("CLERK_WEBHOOK_SECRET");

// Clerk sends a webhook when a user is deleted.
// This function deletes the corresponding row from user_profiles.
Deno.serve(async (req) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await req.json();

    // Verify this is a user.deleted event
    if (payload.type !== "user.deleted") {
      return new Response(JSON.stringify({ message: "Ignored event" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const clerkUserId = payload.data?.id;
    if (!clerkUserId) {
      return new Response(JSON.stringify({ error: "No user ID in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Use the service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Delete the user's profile
    const { error } = await supabase
      .from("user_profiles")
      .delete()
      .eq("id", clerkUserId);

    if (error) {
      console.error("Error deleting user profile:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(`Deleted profile for Clerk user: ${clerkUserId}`);
    return new Response(
      JSON.stringify({ success: true, deleted: clerkUserId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
