const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Images');
const destDir = path.join(__dirname, 'public');

const files = [
  { src: 'IMG (24).jpg', dest: 'wp1.jpg' },
  { src: 'IMG (36).jpg', dest: 'wp2.jpg' },
  { src: 'IMG (37).jpg', dest: 'wp3.jpg' },
  { src: 'IMG (38).jpg', dest: 'wp4.jpg' },
];

files.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${file.dest}`);
  }
});
