import { filterLeaveRequests, sortByDateFrom } from "../utils/filterAndSort";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import { renderHook, act } from "@testing-library/react";

const mockRequests = [
  { name: "Ana", status: "approved", date_from: "2024-05-01" },
  { name: "Carlos", status: "pending", date_from: "2024-04-20" },
  { name: "ana", status: "pending", date_from: "2024-04-25" },
];

describe("filterLeaveRequests", () => {
  it("filtra por nombre (insensible a mayúsculas)", () => {
    const result = filterLeaveRequests(mockRequests, { search: "an" });
    expect(result).toHaveLength(2); // Ana y ana
  });

  it("filtra por estado", () => {
    const result = filterLeaveRequests(mockRequests, { status: "approved" });
    expect(result).toEqual([
      { name: "Ana", status: "approved", date_from: "2024-05-01" },
    ]);
  });

  it("filtra por nombre y estado combinados", () => {
    const result = filterLeaveRequests(mockRequests, {
      search: "ana",
      status: "pending",
    });
    expect(result).toEqual([
      { name: "ana", status: "pending", date_from: "2024-04-25" },
    ]);
  });
});

describe("sortByDateFrom", () => {
  it("ordena por fecha ascendente", () => {
    const result = sortByDateFrom(mockRequests, true);
    expect(result.map((r) => r.date_from)).toEqual([
      "2024-04-20",
      "2024-04-25",
      "2024-05-01",
    ]);
  });

  it("ordena por fecha descendente", () => {
    const result = sortByDateFrom(mockRequests, false);
    expect(result.map((r) => r.date_from)).toEqual([
      "2024-05-01",
      "2024-04-25",
      "2024-04-20",
    ]);
  });
});
