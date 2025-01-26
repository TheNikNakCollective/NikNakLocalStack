import chokidar from "chokidar";
import { build } from "./build";
import { niknakPackagesDir, root } from "./paths";
import { ChildProcess, spawn } from "child_process";
import path from "path";
import util from 'util';

const spawnAsync = util.promisify(spawn);

let childProcess: ChildProcess | null = null;

const args = process.argv.slice(2);

function runBuiltApp() {
  console.log("Starting dist/index.js...");
  childProcess = spawn("node", ["dist/index.js"], {
    stdio: "inherit",
    cwd: process.cwd(),
  });
}

async function buildPackages() {
  console.log("Building packages");
  await spawnAsync("yarn", ["build"], {
    stdio: "inherit",
    cwd: niknakPackagesDir,
  });
}

function restartBuiltApp() {
  if (childProcess) {
    console.log("Stopping existing process...");
    childProcess.kill();
  }
  runBuiltApp();
}

async function buildWithWatchMode(dir: string) {
  console.log("Running build in watch mode");
  // await buildPackages();
  build(dir);
  runBuiltApp();

  chokidar
    .watch([dir, niknakPackagesDir], {
      ignored: (path) => {
        return (
          path.includes("dist") ||
          path.includes(".nx") ||
          path.includes(".yarn") ||
          path.includes(".git")
        );
      }
    })
    .on("change", async (path, stats) => {
      console.log(`Changed: ${path}`);
      console.log("Rebuilding...");
      // await buildPackages();
      build(dir);
      restartBuiltApp();
    });
}

async function main(dir: string) {
  if (args.includes("--watch") || args.includes("-w")) {
    buildWithWatchMode(dir);
  } else {
    await buildPackages();
    await build(dir);
  }
}

main(process.cwd()).then(() => {
  console.log('Build Successful')
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
