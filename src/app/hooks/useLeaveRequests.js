import { useEffect, useState } from "react";
import { fetchLeaveRequests } from "../utils/fetchRequestData";

export const useLeaveRequests = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchLeaveRequests();
      setList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = (id, status) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return { list, loading, updateStatus };
};
