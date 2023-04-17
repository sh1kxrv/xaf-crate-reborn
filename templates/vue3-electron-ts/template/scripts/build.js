const Path = require("path");
const Chalk = require("chalk");
const FileSystem = require("fs");
const Vite = require("vite");
const compileTs = require("./private/tsc");

function buildRenderer() {
  return Vite.build({
    configFile: Path.join(__dirname, "..", "vite.config.ts"),
    base: "./",
    mode: "production",
  });
}

function buildMain() {
  const mainPath = Path.join(__dirname, "..", "src", "main");
  return compileTs(mainPath);
}

FileSystem.rmSync(Path.join(__dirname, "..", "build"), {
  recursive: true,
  force: true,
});

console.log(Chalk.redBright("Transpiling renderer"));

Promise.allSettled([buildRenderer(), buildMain()]).then(() => {
  console.log(
    Chalk.greenBright(
      "Successfully transpiled! (ready to be built with electron-builder)"
    )
  );
});
