import chokidar from "chokidar";
import { build } from "./build";
import { niknakPackagesDir, root, src } from "./paths";
import { ChildProcess, spawn } from "child_process";

let childProcess: ChildProcess | null = null;

function runBuiltApp() {
  console.log("Starting dist/index.js...");
  childProcess = spawn("node", ["dist/index.js"], { stdio: "inherit", cwd: root });
}

function restartBuiltApp() {
  if (childProcess) {
    console.log("Stopping existing process...");
    childProcess.kill();
  }
  runBuiltApp();
}

async function buildWithWatchMode() {
  console.log("Running build in watch mode");
  build();
  runBuiltApp();

  chokidar.watch([src, niknakPackagesDir]).on("change", (event, path) => {
    console.log(`Changed: ${JSON.stringify(path)}`);
    console.log("Rebuilding...");
    build();
    restartBuiltApp();
  });
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--watch") || args.includes("-w")) {
    buildWithWatchMode();
  } else {
    build();
  }
}

main();