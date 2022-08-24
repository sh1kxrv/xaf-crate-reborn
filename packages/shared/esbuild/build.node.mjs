import { build } from "esbuild";
import { rmDistPlugin } from "./plugins/rm-dist.mjs";
import { moveApp } from "./plugins/move-app.mjs";
import { esbuildPluginAliasPath } from "esbuild-plugin-alias-path";
import { cwd } from "process";
import path from "path";

const src = path.resolve(cwd(), "./src");

export const buildNode = async (entrypoint) => {
  await build({
    entryPoints: [entrypoint],
    platform: "node",
    target: "node16",
    format: "esm",
    bundle: true,
    outdir: "./dist",
    sourcemap: true,
    logLevel: "info",
    plugins: [
      rmDistPlugin(),
      moveApp(),
      esbuildPluginAliasPath({
        alias: {
          "~/*": src,
        },
      }),
    ],
  });
};
