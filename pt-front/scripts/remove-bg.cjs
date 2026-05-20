const { Jimp } = require('jimp');

async function removeBg(filePath) {
  try {
    console.log(`Processing: ${filePath}...`);
    const image = await Jimp.read(filePath);
    
    // We scan through all pixels and make any pixel close to white transparent
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If the pixel is very close to white (RGB > 240, 240, 240)
      if (r > 240 && g > 240 && b > 240) {
        this.bitmap.data[idx + 3] = 0; // set alpha channel to 0 (fully transparent)
      }
    });
    
    await image.write(filePath);
    console.log(`Successfully removed background from ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function main() {
  await removeBg('public/products/bm-delivery.png');
  await removeBg('public/products/possible-cleaning.png');
}

main();
