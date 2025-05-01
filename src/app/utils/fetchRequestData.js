const fetchLeaveRequests = async () => {
  const res = await fetch(
    "https://67f551e6913986b16fa426fd.mockapi.io/api/v1/leave_requests"
  );
  if (!res.ok) throw new Error("Failed to fetch leave requests");
  return res.json();
};

export { fetchLeaveRequests };
