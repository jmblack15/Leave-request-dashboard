import { renderHook, act } from "@testing-library/react";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import * as fetchModule from "../utils/fetchRequestData";

describe("useLeaveRequests", () => {
  const mockData = [
    { id: 1, name: "Ana", status: "pending" },
    { id: 2, name: "Luis", status: "pending" },
  ];

  beforeEach(() => {
    // Mock de la función que hace fetch
    jest.spyOn(fetchModule, "fetchLeaveRequests").mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("carga datos y actualiza el estado loading", async () => {
    const { result } = renderHook(() => useLeaveRequests());

    // Estado inicial: loading = true
    expect(result.current.loading).toBe(true);

    // Esperar resolución del fetch
    await act(async () => {});

    // Estado final
    expect(result.current.loading).toBe(false);
    expect(result.current.list).toEqual(mockData);
  });

  it("actualiza el estado de un request con updateStatus", async () => {
    const { result } = renderHook(() => useLeaveRequests());

    await act(async () => {}); // Esperar que cargue

    // Aprobar id:1
    act(() => {
      result.current.updateStatus(1, "approved");
    });

    expect(result.current.list).toEqual([
      { id: 1, name: "Ana", status: "approved" },
      { id: 2, name: "Luis", status: "pending" },
    ]);

    // Rechazar id:2
    act(() => {
      result.current.updateStatus(2, "rejected");
    });

    expect(result.current.list).toEqual([
      { id: 1, name: "Ana", status: "approved" },
      { id: 2, name: "Luis", status: "rejected" },
    ]);
  });
});
