import * as paths from "./paths";
import chokidar from "chokidar";
import execa from "execa";
import path from "path";
import { excludeHostFiles } from "./ignore";

async function isServiceRunning(serviceName: string) {
  try {
    const { stdout } = await execa(
      "docker-compose",
      ["ps", "--services", "--filter", "status=running"],
      { cwd: paths.root }
    );

    const runningServices = stdout.split("\n").map((service) => service.trim());
    return runningServices.includes(serviceName);
  } catch (error) {
    console.error(`Error checking service status: ${(error as Error).message}`);
    return false;
  }
}

async function syncFile(containerPath: string, file: string) {
  const relativePath = path.relative(paths.niknakPackagesDir, file);
  const targetPath = path.join(containerPath, relativePath);

  console.log(`Copying ${file} to container path: ${targetPath}`);

  const isIngestorRunning = await isServiceRunning("ingestor");

  await execa("docker-compose", ["cp", file, `app:${targetPath}`]);

  if (isIngestorRunning) {
    await execa("docker-compose", ["cp", file, `ingestor:${targetPath}`]);
  }
}

async function main() {
  chokidar
    .watch([paths.niknakPackagesDir], {
      ignored: (path) => {
        return excludeHostFiles(path);
      },
    })
    .on("change", async (file) => {
      await syncFile(
        "/usr/src/NikNakLocalStack/app/node_modules/niknak-packages",
        file
      );
    });

  chokidar
    .watch([paths.niknakPackagesDir], {
      ignored: (path) => {
        return excludeHostFiles(path);
      },
    })
    .on("change", async (file) => {
      await syncFile("/usr/src/NikNakPackages", file);
    });

  chokidar
    .watch([paths.root], {
      ignored: (path) => {
        return excludeHostFiles(path);
      },
    })
    .on("change", async (file) => {
      await syncFile("/usr/src/NikNakLocalStack", file);
    });
}

main();
