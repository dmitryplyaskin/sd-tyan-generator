export const saveDataAsJSONFile = (data: { [key: string]: any }) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "data.json";

  link.click();

  URL.revokeObjectURL(url);
};
