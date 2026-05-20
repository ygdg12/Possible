const { Jimp } = require('jimp');

async function identify(filePath) {
  try {
    const image = await Jimp.read(filePath);
    let greenPixels = 0;
    let bluePixels = 0;
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Ignore white or near-white pixels
      if (r > 240 && g > 240 && b > 240) return;
      
      if (g > r && g > b) {
        greenPixels++;
      } else if (b > r && b > g) {
        bluePixels++;
      }
    });
    
    console.log(`File: ${filePath}`);
    console.log(`Dimensions: ${image.bitmap.width}x${image.bitmap.height}`);
    console.log(`Green-dominated pixels: ${greenPixels}`);
    console.log(`Blue-dominated pixels: ${bluePixels}`);
    if (greenPixels > bluePixels) {
      console.log(`Result: Likely BM Delivery (Green)\n`);
    } else {
      console.log(`Result: Likely Possible Cleaning (Blue)\n`);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
}

async function main() {
  await identify('C:/Users/yared/.gemini/antigravity/brain/f3609faa-ec5f-45ac-a0b6-8daf9588ea76/media__1779279190581.png');
  await identify('C:/Users/yared/.gemini/antigravity/brain/f3609faa-ec5f-45ac-a0b6-8daf9588ea76/media__1779279190698.png');
}

main();
