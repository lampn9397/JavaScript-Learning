export const getImageRootUrl = () => {
  const { PORT } = process.env;

  return `http://127.0.0.1:${PORT}/images`;
};