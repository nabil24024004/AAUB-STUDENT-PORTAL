/// <reference types="vite/client" />

// Figma asset imports resolved via vite.config.ts alias
declare module "figma:asset/*.png" {
  const figmaAsset: string;
  export default figmaAsset;
}

// Image asset imports
declare module "*.png" {
  const imageAsset: string;
  export default imageAsset;
}
