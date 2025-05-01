"use client";

import { formatDate } from "../utils/date";
import { getStatusBadgeClass } from "../utils/statusStyle";

import { Button } from "@ui5/webcomponents-react";

const DashboardTable = ({ requests, loading, onStatusChange }) => (
  <div className="overflow-x-auto bg-whiteColor rounded-lg shadow-md h-[84vh]">
    <table className="min-w-full bg-whiteColor rounded-lg shadow-md bg-white ">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-lg font-bold text-secondaryColor min-w-[240px]">
            Employee name
          </th>
          <th className="px-4 py-2 text-left text-lg font-bold text-secondaryColor min-w-[160px]">
            Type of leave
          </th>
          <th className="px-4 py-2 text-left text-lg font-bold text-secondaryColor min-w-[190px]">
            Dates
          </th>
          <th className="px-4 py-2 text-left text-lg font-bold text-secondaryColor min-w-[160px]">
            Status
          </th>
          <th className="px-4 py-2 text-left text-lg font-bold text-secondaryColor min-w-[160px]">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className={loading ? "animate-pulse " : ""}>
        {loading ? (
          <tr>
            <td colSpan={5} className="text-center">
              Loading...
            </td>
          </tr>
        ) : (
          requests.map((req) => (
            <tr key={req.id} className="border-t border-gray-100 h-[80px] p-2">
              <td className="pl-4 ml-4">{req.name}</td>
              <td className="pl-4 ml-4">{req.type_of_leave}</td>
              <td className="pl-4 ml-4">
                {formatDate(req.date_from)} → {formatDate(req.date_to)}
              </td>
              <td className="pl-4 ml-4">
                <div
                  className={`h-8 rounded-full px-3 py-1 text-sm w-[150px] flex flex-col items-center justify-center text-center font-medium ${getStatusBadgeClass(
                    req.status
                  )}`}
                >
                  {req.status}
                </div>
              </td>
              <td className="pl-4 ml-4">
                <Button
                  design="Positive"
                  onClick={() => onStatusChange(req.id, "APPROVED")}
                >
                  Approve
                </Button>
                <Button
                  design="Negative"
                  className="ml-3"
                  onClick={() => onStatusChange(req.id, "REJECTED")}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DashboardTable;
