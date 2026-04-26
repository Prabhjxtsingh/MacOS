const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'Images', 'IMG (38).jpg');
const dest = path.join(__dirname, 'public', 'wallpaper.jpg');

fs.copyFileSync(src, dest);
console.log('Image copied successfully!');
