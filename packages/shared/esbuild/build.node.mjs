import { build } from "esbuild";
import fg from "fast-glob";
import { rmDistPlugin } from "./rm-dist.mjs";
import { esbuildPluginAliasPath } from "esbuild-plugin-alias-path";
import { fileURLToPath, URL } from "url";

export const buildNode = async ({ ...args }) => {
  await build({
    entryPoints: await fg("src/**/*.ts"),
    platform: "node",
    target: "node16",
    format: "esm",
    bundle: false,
    outdir: "./dist",
    sourcemap: false,
    logLevel: "info",
    plugins: [
      rmDistPlugin(),
      esbuildPluginAliasPath({
        alias: {
          "~/src/*": "./src/",
        },
      }),
    ],
    ...args,
  });
};
