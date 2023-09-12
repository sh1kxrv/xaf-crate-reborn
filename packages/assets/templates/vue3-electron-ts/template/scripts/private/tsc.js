const child = require("child_process");
const chalk = require("chalk");

function compile(directory) {
  return new Promise((resolve, reject) => {
    const tscProcess = child.exec("tsc", {
      cwd: directory,
    });

    tscProcess.stdout.on("data", (data) =>
      process.stdout.write(
        chalk.redBright(`[tsc] ${chalk.white(data.toString())}`)
      )
    );

    tscProcess.on("exit", (exitCode) => {
      if (exitCode > 0) {
        reject(exitCode);
      } else {
        resolve();
      }
    });
  });
}

module.exports = compile;
