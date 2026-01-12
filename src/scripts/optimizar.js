const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Usamos __dirname para evitar problemas de rutas
const inputFolder = path.join(__dirname, "../imagenes");
const outputFolder = path.join(__dirname, "../imagenes/optimizadas");

// Definimos los anchos que queremos generar para "Resolution Switching"
const SIZES = [400, 800, 1200];
const QUALITY = 80;

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

console.log(`📍 Buscando imágenes en: ${inputFolder}`);

fs.readdir(inputFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    // Solo procesamos jpg y png
    if (!file.match(/\.(jpg|jpeg|png)$/i)) return;

    const inputFile = path.join(inputFolder, file);
    const fileName = path.parse(file).name;

    // 1. Generando la versión original optimizada
    sharp(inputFile)
      .webp({ quality: QUALITY })
      .toFile(path.join(outputFolder, `${fileName}.webp`))
      .catch((err) => console.error(`Error original ${file}:`, err));

    // 2. Generando las versiones redimensionadas (BUCLE NUEVO)
    SIZES.forEach((width) => {
      const outputFile = path.join(outputFolder, `${fileName}-${width}.webp`);

      sharp(inputFile)
        .resize({ width: width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputFile)
        .then(() => {
          console.log(`✅ Generado: ${fileName}-${width}.webp`);
        })
        .catch((err) => console.error(`❌ Error ${file} (${width}px):`, err));
    });
  });
});
