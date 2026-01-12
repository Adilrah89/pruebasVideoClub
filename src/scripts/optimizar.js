const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "../imagenes");
const outputFolder = path.join(__dirname, "../imagenes/optimizadas");

const SIZES = [400, 800, 1200];
const QUALITY = 80;

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdir(inputFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) return;

    const inputFile = path.join(inputFolder, file);
    const fileName = path.parse(file).name;

    sharp(inputFile)
      .webp({ quality: QUALITY })
      .toFile(path.join(outputFolder, `${fileName}.webp`))
      .catch((err) => {});

    SIZES.forEach((width) => {
      const outputFile = path.join(outputFolder, `${fileName}-${width}.webp`);

      sharp(inputFile)
        .resize({ width: width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputFile)
        .then(() => {})
        .catch((err) => {});
    });
  });
});
