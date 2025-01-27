import chokidar from "chokidar";
import { buildService } from "./build-service";
import { niknakPackagesDir } from "./paths";
import { ChildProcess, spawn } from "child_process";
import util from "util";
import { excludeHostFiles } from "./ignore";

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
  await buildService(dir);
  runBuiltApp();

  chokidar
    .watch([dir, niknakPackagesDir], {
      ignored: (path) => {
        return excludeHostFiles(path);
      },
    })
    .on("change", async (path, stats) => {
      console.log(`Changed: ${path}`);
      console.log("Rebuilding...");
      await buildService(dir);
      restartBuiltApp();
    });
}

async function main(dir: string) {
  if (args.includes("--watch") || args.includes("-w")) {
    buildWithWatchMode(dir);
  } else {
    await buildPackages();
    await buildService(dir);
  }
}

main(process.cwd())
  .then(() => {
    console.log("Build Successful");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
