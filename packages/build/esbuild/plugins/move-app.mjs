export const moveApp = () => ({
  name: "move app plugin",
  setup({ onEnd }) {
    onEnd(async () => {
      console.log("Todo: Move app");
    });
  },
});
