# Leave Request Dashboard

A simple dashboard built with React and custom hooks to manage employee leave requests. It supports viewing, filtering, and updating the approval status of requests.

---

## ✅ What was implemented

- Custom React hook `useLeaveRequests` to fetch and manage leave data.
- Functionality to approve or reject leave requests via `updateStatus`.
- Filtering and sorting utilities for leave data (`filterLeaveRequests`, `sortByDateFrom`).
- Unit tests using Jest and Testing Library to verify the core logic.

---

## 🚀 How to run the project

1. Install dependencies:

``bash
npm install

2. Start the development server:
   ``bash
   npm run dev

3. Open your browser at http://localhost:3000
   ``bash
   npm run test

## 🧪 How to run the tests

``bash
npm test

## 🧩 Why UI5 components were not used

Only Tailwind was used because the @ui5/webcomponents-react library is not compatible with Next15.
