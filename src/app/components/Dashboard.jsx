"use client";

import { useEffect, useState } from "react";
import {
  Button,
  SegmentedButton,
  SegmentedButtonItem,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/Assets.js";

const Dashboard = () => {
  const [listLeaveRequest, setListLeaveRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  // const [statusFilter, setStatusFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleGetLeaveRequest = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://67f551e6913986b16fa426fd.mockapi.io/api/v1/leave_requests"
      );
      const data = await res.json();

      setListLeaveRequest(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetLeaveRequest();
  }, []);

  const filteredData = listLeaveRequest.filter((item) =>
    statusFilter ? item.status === statusFilter : true
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.dateRequested);
    const dateB = new Date(b.dateRequested);
    return sortAsc
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  console.log(listLeaveRequest);

  return (
    <main className="p-4 md:p-7 flex flex-col h-[100vh] justify-evenly">
      <bar className="flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-[#002375] text-center font-bold text-3xl">
          Leave Request Dashboard
        </h1>

        <div className="gap-3 flex flex-row flex-wrap items-center justify-center">
          <Button
          // icon={sortAsc ? "sort-ascending" : "sort-descending"}
          // onClick={() => setSortAsc((prev) => !prev)}
          >
            Sort by Date Requested
          </Button>

          <SegmentedButton
            onSelectionChange={(e) =>
              setStatusFilter(e.detail.selectedItem.dataset.status)
            }
          >
            <SegmentedButtonItem pressed data-status="">
              All
            </SegmentedButtonItem>
            <SegmentedButtonItem data-status="Pending">
              Pending
            </SegmentedButtonItem>
            <SegmentedButtonItem data-status="Approved">
              Approved
            </SegmentedButtonItem>
            <SegmentedButtonItem data-status="Rejected">
              Rejected
            </SegmentedButtonItem>
          </SegmentedButton>
        </div>
      </bar>

      <div className="overflow-x-auto bg-whiteColor rounded-lg shadow-md min-h-[85vh]">
        <table className="min-w-full bg-whiteColor rounded-lg shadow-md bg-white">
          <thead className="">
            <tr>
              <th className="px-4 py-2 text-left text-lg font-bold text-secondaryColor min-w-[200px]">
                Employee name
              </th>
              <th className="px-4 py-2 text-left text-lg font-bold text-secondaryColor min-w-[170px]">
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
          <tbody>
            {isLoading
              ? Array.from({ length: 9 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="w-[90%] h-[90px]">
                    {[...Array(5)].map((_, j) => (
                      <td
                        key={j}
                        className="p-2 animate-pulse h-4 bg-[#eaf0fd] w-full"
                      >
                        <div></div>
                      </td>
                    ))}
                  </tr>
                ))
              : listLeaveRequest.map((request) => (
                  <tr key={request.id} className="border-t w-[90%] h-[90px]">
                    <td className="px-4 py-2 text-base text-black">
                      {request.name}
                    </td>
                    <td className="px-4 py-2 text-base text-[#878787]">
                      {request.type_of_leave}
                    </td>
                    <td className="px-4 py-2 text-base text-[#878787] flex flex-col justify-evenly my-auto h-[90px]">
                      <div className="flex gap-1">
                        <p className="text-black">date from : </p>
                        <p>{request.date_from}</p>
                      </div>
                      <div className="flex gap-1">
                        <p className="text-black">date to : </p>
                        <p>{request.date_to}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-base text-[#878787]">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm min-w-[100px] text-center font-medium ${
                          request.status === "APPROVED"
                            ? "bg-[#2AA852] text-white"
                            : request.status === "PENDING"
                            ? "bg-[#F7C850] text-white"
                            : "bg-[#E62F39] text-white"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-base text-[#878787]">
                      <Button
                        design="Positive"
                        className="px-2 py-1 rounded hover:bg-green-700 hover:text-white"
                        onClick={() => handleStatusChange(item.id, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        design="Negative"
                        className=" px-2 py-1 rounded hover:bg-red-600 hover:text-white ml-2"
                        onClick={() => handleStatusChange(item.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
            {/* {workOrderDataList.map((item, index) => (
              <tr key={index} className="border-t w-[90%] h-[90px]">
                <td className="px-4 py-2 text-base text-tertiaryColor">
                  {item.workOrder}
                </td>
                <td className="px-4 py-2 text-base text-tertiaryColor">
                  {item.client}
                </td>
                <td className="px-4 py-2 text-base text-tertiaryColor">
                  {item.location}
                </td>
                <td className="px-4 py-2 text-base text-tertiaryColor">
                  {item.dateTime}
                </td>
                <td className="px-4 py-2 text-base text-tertiaryColor">
                  {item.technicians}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm min-w-[100px] text-center font-medium ${
                      item.status === "Completed"
                        ? "bg-[#2AA852] text-white"
                        : item.status === "In Progress"
                        ? "bg-[#F7C850] text-white"
                        : item.status === "Scheduled"
                        ? "bg-[#17407C] text-white"
                        : "bg-[#E62F39] text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 relative">
                  {selectedIndex === index && (
                    <div
                      ref={detailsMenuRef}
                      className={`"top-0 right-0 w-[185px] bg-whiteColor shadow-md p-4 text-sm flex flex-col text-primaryColor z-10 rounded justify-evenly gap-3 absolute`}
                    >
                      <button
                        onClick={() => openModal(item)}
                        className="flex items-center space-x-2"
                      >
                        <Image
                          src="/icons/view.png"
                          alt="Logo"
                          width={15}
                          height={15}
                          className="export-icon"
                        />
                        <p>View</p>
                      </button>
                      <button className="flex items-center space-x-2">
                        <Image
                          src="/icons/checkComplete.png"
                          alt="Logo"
                          width={15}
                          height={15}
                          className="export-icon"
                        />
                        <p>Mark Complete</p>
                      </button>
                      <button className="flex items-center space-x-3">
                        <Image
                          src="/icons/delete.png"
                          alt="Logo"
                          width={11}
                          height={15}
                          className="export-icon"
                        />
                        <p>Delete</p>
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => toggleActions(index)}
                    className="rounded-full p-2 hover:bg-gray-100"
                  >
                    <span className="text-gray-500">•••</span>
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
        {/* <div className="mt-4 flex justify-end space-x-2 text-sm">
          <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
            1
          </button>
          <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
            2
          </button>
          <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
            3
          </button>
          <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
            ...
          </button>
        </div> */}
      </div>

      {/* <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">Employee Name</th>
              <th className="p-2 border-b">Type of Leave</th>
              <th className="p-2 border-b">Dates</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Reason</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="p-2">
                        <div className="animate-pulse h-4 bg-gray-200 rounded w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : sortedData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.employeeName}</td>
                    <td className="p-2">{item.typeOfLeave}</td>
                    <td className="p-2">
                      {item.fromDate} - {item.toDate}
                    </td>
                    <td className="p-2">{item.status}</td>
                    <td className="p-2">{item.reason || "N/A"}</td>
                    <td className="p-2 space-x-2">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        onClick={() => handleStatusChange(item.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleStatusChange(item.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div> */}
    </main>
  );
};

export { Dashboard };
