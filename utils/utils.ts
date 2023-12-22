export const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const isMobile = () => {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};
