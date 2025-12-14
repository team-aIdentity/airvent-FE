export const formatDate = (dateString: string, format: "date" | "time") => {
  const date = new Date(dateString);

  if (format === "time") {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};
