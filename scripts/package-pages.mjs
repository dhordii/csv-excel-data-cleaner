import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist");
const runtimeFiles = [
  "app.js",
  "favicon.svg",
  "index.html",
  "styles.css",
  "theme-boot.js",
  "xlsx-worker.js"
];
const vendorFiles = ["JSZIP-LICENSE.md", "README.md", "jszip.min.js", "xlsx.full.min.js"];

if (path.dirname(output) !== root || path.basename(output) !== "dist") {
  throw new Error(`Refusing to replace an unexpected output directory: ${output}`);
}

async function copy(relativePath) {
  const source = path.join(root, relativePath);
  const destination = path.join(output, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(source, destination);
}

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });
await Promise.all([...runtimeFiles, ...vendorFiles.map((file) => `vendor/${file}`)].map(copy));

const topLevel = (await readdir(output)).sort();
const expectedTopLevel = [...runtimeFiles.filter((file) => !file.includes("/")), "vendor"].sort();
if (JSON.stringify(topLevel) !== JSON.stringify(expectedTopLevel)) {
  throw new Error(`Unexpected Pages artifact contents: ${topLevel.join(", ")}`);
}
if ((await stat(path.join(output, "app.js"))).size === 0) throw new Error("The app bundle is empty.");
if ((await stat(path.join(output, "xlsx-worker.js"))).size === 0) throw new Error("The worker bundle is empty.");

console.log(`Packaged ${runtimeFiles.length + vendorFiles.length} verified files in dist/.`);
