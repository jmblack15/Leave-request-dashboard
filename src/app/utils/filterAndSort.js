export const filterLeaveRequests = (requests, { search = "", status = "" }) => {
  return requests.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (!status || item.status === status)
  );
};

export const sortByDateFrom = (requests, asc = true) => {
  return [...requests].sort((a, b) => {
    const dateA = new Date(a.date_from);
    const dateB = new Date(b.date_from);
    return asc ? dateA - dateB : dateB - dateA;
  });
};
