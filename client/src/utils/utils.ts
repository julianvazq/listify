export const copyToClipboard = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
