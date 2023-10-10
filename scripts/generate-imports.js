import fs from "fs/promises";
import path from "path";

function toCamelCase(filename) {
  const name = filename
    .replaceAll(" ", "-")
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
  const files = await fs.readdir(path.resolve("./templates"), console.log);
  let imports = `import { PresetTemplateFileType } from "../types"\n`;
  let filesArr = [];

  // Генерируем импорты
  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const name = toCamelCase(file.replace(/\.json$/, ""));
      imports += `import ${name} from '../../../templates/${file}';\n`;
      filesArr.push(name);
    }
  });

  imports += `\nexport const templates: PresetTemplateFileType[] = [${filesArr.join(
    ","
  )}]`;

  // Записываем в imports.js
  fs.writeFile(
    path.resolve("./src/generator/model/templates-import.ts"),
    imports
  );
};
