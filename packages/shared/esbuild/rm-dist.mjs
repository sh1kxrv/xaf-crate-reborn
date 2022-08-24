import { rm } from "fs/promises";

const rmOutDir = async ({ path }) => {
  try {
    await rm(path, { recursive: true });
  } catch (error) {}
};

export const rmDistPlugin = () => ({
  name: "rm -rf dist",
  setup({ onStart }) {
    onStart(async () => {
      await rmOutDir({ path: "./dist" });
    });
  },
});
