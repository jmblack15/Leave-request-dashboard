import { render, fireEvent, screen } from "@testing-library/react";
import DashboardTable from "../app/dashboard/components/DashboardTable";

const mockData = [
  {
    id: "1",
    name: "John",
    type_of_leave: "Vacation",
    date_from: "2024-05-01",
    date_to: "2024-05-03",
    status: "PENDING",
  },
];

test("displays employee data", () => {
  render(
    <DashboardTable
      requests={mockData}
      loading={false}
      onStatusChange={() => {}}
    />
  );
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Vacation")).toBeInTheDocument();
});

test("calls status change on Approve button click", () => {
  const onStatusChange = jest.fn();
  render(
    <DashboardTable
      requests={mockData}
      loading={false}
      onStatusChange={onStatusChange}
    />
  );
  fireEvent.click(screen.getByText("Approve"));
  expect(onStatusChange).toHaveBeenCalledWith("1", "APPROVED");
});
