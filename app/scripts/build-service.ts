import * as esbuild from "esbuild";
import path from "path";
import { niknakPackagesDir, root } from "./paths";
import esbuildPluginTsc from 'esbuild-plugin-tsc';

export async function buildService(dir: string) {
  await esbuild.build({
    entryPoints: [path.resolve(dir, 'src', "index.ts")],
    bundle: true,
    platform: "node",
    outdir: path.join(dir, "dist"),
    minify: false,
    external: ["esbuild", "fsevents", "reflect-metadata"],
    banner: {},
    logLevel: "silent",
    define: {},
    sourcemap: true,
    nodePaths: [
      path.join(root, "node_modules"),
      path.join(niknakPackagesDir, "node_modules"),
    ],
    alias: {
        "@app": path.join(niknakPackagesDir, "packages", "app", "src")
    },
    format: 'cjs',
    plugins: [esbuildPluginTsc({ tsconfigPath: path.join(dir, 'tsconfig.json')})]
  });
}
