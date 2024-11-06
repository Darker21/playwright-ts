import { customDevices } from "../../lib/types/devices/index.ts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Beggining device-list export");

const deviceNames = Object.getOwnPropertyNames(customDevices).sort();
const outPath = path.join(__dirname, "../device-list.txt");

let lines: string[] = [];
lines.push(
  "/* ALL DEVICES ARE PULLED FROM THE DEVICE TYPE IN THE PLAYWRIGHT LIBRARY */",
  "/* REGENERATE LIST USING `npm run ref:generate` */\n",
  ...deviceNames
);

const content = lines.join("\n");

fs.writeFile(outPath, content, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Device list generated successfully!");
  }
});
