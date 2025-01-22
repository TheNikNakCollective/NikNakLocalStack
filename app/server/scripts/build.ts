import * as esbuild from "esbuild";
import path from "path";
import { niknakPackagesDir, root, src } from "./paths";
import esbuildPluginTsc from 'esbuild-plugin-tsc';

export async function build() {
  await esbuild.build({
    entryPoints: [path.resolve(src, "index.ts")],
    bundle: true,
    platform: "node",
    outdir: path.join(root, "dist"),
    minify: false,
    external: ["esbuild", "fsevents", "reflect-metadata"],
    banner: {},
    logLevel: "silent",
    define: {},
    nodePaths: [
      path.join(root, "node_modules"),
      path.join(niknakPackagesDir, "node_modules"),
    ],
    alias: {
        "@app": path.join(niknakPackagesDir, "packages", "app", "src")
    },
    format: 'cjs',
    plugins: [esbuildPluginTsc({ tsconfigPath: path.join(root, 'tsconfig.json')})]
  });
}
