"use client";

const FilterBar = ({
  sortAsc,
  setSortAsc,
  search,
  setSearch,
  setStatusFilter,
  statusFilter,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5 ">
    <input
      type="text"
      placeholder="Search by name"
      value={search}
      onInput={(e) => setSearch(e.target.value)}
      className="px-4 h-9 py-2 border bg-white shadow border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div className="flex gap-2 flex-col md:flex-row">
      <button
        onClick={() => setSortAsc((prev) => !prev)}
        className="px-4 h-9 py-2 bg-blue-600 text-white  hover:bg-blue-700 cursor-pointer transition rounded-full"
      >
        Sort by Date From ({sortAsc ? "Asc" : "Desc"})
      </button>

      <div>
        {[
          { label: "All", status: "" },
          { label: "Pending", status: "PENDING" },
          { label: "Approved", status: "APPROVED" },
          { label: "Rejected", status: "REJECTED" },
        ].map(({ label, status }) => (
          <button
            key={status}
            data-status={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-full border cursor-pointer h-9 hover:bg-blue-300 ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default FilterBar;
