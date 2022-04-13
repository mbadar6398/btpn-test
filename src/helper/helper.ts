export const checkFileExtension = (filename: string) => {
  if (
    filename.includes('png') ||
    filename.includes('jpg') ||
    filename.includes('jpeg') ||
    filename.includes('gif')
  ) {
    return 'image';
  } else {
    return 'file';
  }
};
