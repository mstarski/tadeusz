export const appExit = (error) => {
  console.error("An error has occured. Gracefully exiting an app...\n", error);
  process.exit(0);
};
