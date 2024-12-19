export const convertToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result);
    reader.onerror = (error) => reject(error);
  });

export const formatBase64 = (string: string) => {
  const commaIndex = string?.indexOf(","); // Find the index of the first comma
  if (commaIndex !== -1) {
    const dataAfterComma = string?.slice(commaIndex + 1); // Extract data after the first comma
    return dataAfterComma; // This will log the data after the first comma
  } else {
    console.log("Error formatting string");
  }
};
