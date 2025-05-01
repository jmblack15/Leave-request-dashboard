"use client";

import {
  Input,
  Button,
  SegmentedButton,
  SegmentedButtonItem,
} from "@ui5/webcomponents-react";

const FilterBar = ({
  sortAsc,
  setSortAsc,
  search,
  setSearch,
  setStatusFilter,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5">
    <Input
      placeholder="Search by name"
      value={search}
      onInput={(e) => setSearch(e.target.value)}
    />
    <Button onClick={() => setSortAsc((prev) => !prev)}>
      Sort by Date From ({sortAsc ? "Asc" : "Desc"})
    </Button>
    <SegmentedButton
      selectionMode="Single"
      onSelectionChange={(e) =>
        setStatusFilter(e.detail.selectedItems[0].dataset.status)
      }
    >
      <SegmentedButtonItem pressed data-status="">
        All
      </SegmentedButtonItem>
      <SegmentedButtonItem data-status="PENDING">Pending</SegmentedButtonItem>
      <SegmentedButtonItem data-status="APPROVED">Approved</SegmentedButtonItem>
      <SegmentedButtonItem data-status="REJECTED">Rejected</SegmentedButtonItem>
    </SegmentedButton>
  </div>
);

export default FilterBar;
