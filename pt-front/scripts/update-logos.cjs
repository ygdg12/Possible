const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const SRC_BM_DELIVERY = 'C:/Users/yared/.gemini/antigravity/brain/f3609faa-ec5f-45ac-a0b6-8daf9588ea76/media__1779279190581.png';
const SRC_POSSIBLE_CLEANING = 'C:/Users/yared/.gemini/antigravity/brain/f3609faa-ec5f-45ac-a0b6-8daf9588ea76/media__1779279190698.png';

const DEST_BM_DELIVERY = 'public/products/bm-delivery.png';
const DEST_POSSIBLE_CLEANING = 'public/products/possible-cleaning.png';

async function removeBg(filePath) {
  try {
    console.log(`Removing background from: ${filePath}...`);
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
  console.log('Copying new logo files...');
  fs.copyFileSync(SRC_BM_DELIVERY, DEST_BM_DELIVERY);
  console.log(`Copied ${SRC_BM_DELIVERY} -> ${DEST_BM_DELIVERY}`);
  
  fs.copyFileSync(SRC_POSSIBLE_CLEANING, DEST_POSSIBLE_CLEANING);
  console.log(`Copied ${SRC_POSSIBLE_CLEANING} -> ${DEST_POSSIBLE_CLEANING}`);
  
  await removeBg(DEST_BM_DELIVERY);
  await removeBg(DEST_POSSIBLE_CLEANING);
  
  console.log('Update complete!');
}

main();
