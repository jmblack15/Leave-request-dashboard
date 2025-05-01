"use client";

import { useState } from "react";
import { useLeaveRequests } from "./hooks/useLeaveRequests";
import FilterBar from "./components/FilterBar";
import DashboardTable from "./components/DashboardTable";

const DashboardPage = () => {
  const { list, loading, updateStatus } = useLeaveRequests();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = list.filter(
    (item) =>
      (!statusFilter || item.status === statusFilter) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.date_from);
    const dateB = new Date(b.date_from);
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Leave Request Dashboard
      </h1>
      <FilterBar
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
        search={search}
        setSearch={setSearch}
        setStatusFilter={setStatusFilter}
      />
      <DashboardTable
        requests={sorted}
        loading={loading}
        onStatusChange={updateStatus}
      />
    </main>
  );
};

export default DashboardPage;
