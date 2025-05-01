"use client";

import { useState } from "react";
import { useLeaveRequests } from "./hooks/useLeaveRequests";
import FilterBar from "./components/FilterBar";
import DashboardTable from "./components/DashboardTable";
import { filterLeaveRequests, sortByDateFrom } from "./utils/filterAndSort";

const DashboardPage = () => {
  const { list, loading, updateStatus } = useLeaveRequests();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = filterLeaveRequests(list, {
    search,
    status: statusFilter,
  });

  const sorted = sortByDateFrom(filtered, sortAsc);

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
