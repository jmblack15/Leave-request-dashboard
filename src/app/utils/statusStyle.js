const getStatusBadgeClass = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-[#2AA852] text-white";
    case "PENDING":
      return "bg-[#F7C850] text-white";
    case "REJECTED":
      return "bg-[#E62F39] text-white";
    default:
      return "bg-gray-300 text-black";
  }
};

export { getStatusBadgeClass };
