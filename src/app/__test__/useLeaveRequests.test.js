import { renderHook, act } from "@testing-library/react";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import { fetchLeaveRequests } from "../utils/fetchRequestData";

jest.mock("../utils/fetchRequestData", () => ({
  fetchLeaveRequests: jest.fn(),
}));

describe("useLeaveRequests", () => {
  const mockData = [
    { id: 1, name: "Ana", status: "pending" },
    { id: 2, name: "Luis", status: "pending" },
  ];

  beforeEach(() => {
    fetchLeaveRequests.mockResolvedValue(mockData);
  });

  it("carga datos y actualiza el estado loading", async () => {
    const { result } = renderHook(() => useLeaveRequests());

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.list).toEqual(mockData);
  });

  it("actualiza el estado de un request con updateStatus", async () => {
    const { result } = renderHook(() => useLeaveRequests());

    await act(async () => {});

    act(() => {
      result.current.updateStatus(1, "approved");
    });

    expect(result.current.list).toEqual([
      { id: 1, name: "Ana", status: "approved" },
      { id: 2, name: "Luis", status: "pending" },
    ]);

    act(() => {
      result.current.updateStatus(2, "rejected");
    });

    expect(result.current.list).toEqual([
      { id: 1, name: "Ana", status: "approved" },
      { id: 2, name: "Luis", status: "rejected" },
    ]);
  });
});
