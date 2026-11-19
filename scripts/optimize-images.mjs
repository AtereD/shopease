import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const imagesFolder = path.join(process.cwd(), "public/images");

const getImages = async (folder) => {
  const entries = await fs.readdir(folder, { withFileTypes: true });
  let images = [];

  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name);

    if (entry.isDirectory()) {
      images = images.concat(await getImages(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }

  return images;
};

const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const optimizeImages = async () => {
  const images = await getImages(imagesFolder);

  let originalTotal = 0;
  let optimizedTotal = 0;

  console.log(`Found ${images.length} images.\n`);

  for (const image of images) {
    const output = image.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    await fs.rm(output, { force: true });

await sharp(image)
  .rotate()
  .resize({
    width: 1400,
    height: 1400,
    fit: "inside",
    withoutEnlargement: true,
  })
  .webp({ quality: 78, effort: 6 })
  .toFile(output);

    const originalSize = (await fs.stat(image)).size;
    const optimizedSize = (await fs.stat(output)).size;

    originalTotal += originalSize;
    optimizedTotal += optimizedSize;

    console.log(
      `${path.basename(image)}: ${formatSize(originalSize)} → ${formatSize(optimizedSize)}`
    );
  }

  console.log("\nOptimization complete!");
  console.log(`Original total: ${formatSize(originalTotal)}`);
  console.log(`Optimized total: ${formatSize(optimizedTotal)}`);
  console.log(
    `Space saved: ${((1 - optimizedTotal / originalTotal) * 100).toFixed(1)}%`
  );
};

optimizeImages().catch(console.error);