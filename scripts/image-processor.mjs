// scripts/image-processor.mjs
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// Define source and destination directories
const SRC_DIR = "./src/images";
const OUT_DIR = "./public/assets/images/optimized";

// Define input/output directories
const inputDir = path.join(SRC_DIR);
const outputDir = path.join(OUT_DIR);

// Define target widths for responsive images
const WIDTHS = [640, 1024, 1440, 1920, 2560];

// Define output formats and quality settings
const formats = [
  { type: "jpeg", options: { quality: 78, progressive: true } },
  { type: "webp", options: { quality: 55 } },
  { type: "avif", options: { quality: 50 } },
];

async function processImages() {
  // Make sure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Filter to common raster formats
  const files = (await fs.readdir(inputDir)).filter((f) =>
    /\.(jpe?g|png|tif|webp)$/i.test(f)
  );

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const base = path.parse(file).name;

    for (const width of WIDTHS) {
      const resized = sharp(inputPath).resize({
        width,
        withoutEnlargement: true,
      });

      for (const { type, options } of formats) {
        const outputPath = path.join(outputDir, `${base}-w${width}.${type}`);
        await resized.clone()[type](options).toFile(outputPath);
        console.log(`✅ ${base}-w${width}.${type}`);
      }
    }
  }

  console.log("✨ All images processed successfully!");
}

processImages().catch((err) => {
  console.error("❌ Image processing failed:", err);
  process.exit(1);
});
