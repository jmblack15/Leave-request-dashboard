const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateStr);
  return isNaN(date)
    ? "Invalid date"
    : date.toLocaleDateString(undefined, options);
};

export { formatDate };
