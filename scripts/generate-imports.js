import fs from "fs/promises";
import path from "path";

function toCamelCase(filename) {
  const name = filename
    .split("-")
    .map((part, index) => {
      if (index > 0) {
        return part[0].toUpperCase() + part.slice(1);
      }
      return part;
    })
    .join("");

  return name;
}

export const generateImports = async () => {
  // Читаем папку src
  const files = await fs.readdir(path.resolve("./presets"), console.log);
  let imports = `import { PipelineSteps } from "../types"\n`;
  let filesArr = [];

  // Генерируем импорты
  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const name = toCamelCase(file.replace(/\.json$/, ""));
      imports += `import ${name} from '../../../presets/${file}';\n`;
      filesArr.push(name);
    }
  });

  imports += `\nexport const presets = [ ${filesArr.join(
    ","
  )} ] as PipelineSteps[]`;

  // Записываем в imports.js
  fs.writeFile(
    path.resolve("./src/generator/model/presets-import.ts"),
    imports
  );
};
