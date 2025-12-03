const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "src/imagenes";
const outputFolder = "src/imagenes/optimizadas";
const QUALITY = 80;

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

console.log("Procesando imágenes...");
console.log(
  "| Nombre Imagen | Formato Antiguo | Formato Nuevo | Peso Original (KB) | Peso Nuevo (KB) | Mejora (%) |"
);
console.log("|---|---|---|---|---|---|");

fs.readdir(inputFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const inputFile = path.join(inputFolder, file);

    if (!file.match(/\.(jpg|jpeg|png)$/i)) return;

    const fileName = path.parse(file).name;
    const outputFile = path.join(outputFolder, `${fileName}.webp`);

    const stats = fs.statSync(inputFile);
    const originalSizeKB = (stats.size / 1024).toFixed(2);

    sharp(inputFile)
      .webp({ quality: QUALITY })
      .toFile(outputFile)
      .then((info) => {
        const newSizeKB = (info.size / 1024).toFixed(2);
        const improvement = ((1 - info.size / stats.size) * 100).toFixed(2);

        console.log(
          `| ${file} | ${path.extname(
            file
          )} | .webp | ${originalSizeKB} | ${newSizeKB} | ${improvement}% |`
        );
      })
      .catch((err) => console.error(`❌ Error en ${file}:`, err));
  });
});
