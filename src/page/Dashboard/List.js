import React, { useState, useEffect } from 'react';
import axios from 'axios';

function List({ handleEdit, handleDelete }) {
  const [employees, setEmployees] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: null,
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  useEffect(() => {
    axios
      .get("https://localhost:7259/api/Employee") // Ensure you use the correct API URL
      .then(response => setEmployees(response.data)) // Set the data into state
      .catch(error => console.error("There was an error fetching the employees!", error));
  }, []);

  return (
    <div className="overflow-x-auto w-screen">
      <table className="w-full border-collapse">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 text-center">#</th>
            <th className="px-4 py-2 text-center">Emp Id</th>
            <th className="px-4 py-2 text-center">First Name</th>
            <th className="px-4 py-2 text-center">Last Name</th>
            <th className="px-4 py-2 text-center">Email</th>
            <th className="px-4 py-2 text-center">Salary</th>
            <th className="px-4 py-2 text-center">Date</th>
            <th className="px-4 py-2 col-span-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.empId} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="border px-4 py-2 text-center">{i + 1}</td>
                <td className="border px-4 py-2 text-center">{employee.empId}</td>
                <td className="border px-4 py-2 text-center">{employee.fname}</td>
                <td className="border px-4 py-2 text-center">{employee.lname}</td>
                <td className="border px-4 py-2 text-center">{employee.email}</td>
                <td className="border px-4 py-2 text-center">{formatter.format(employee.salary)}</td>
                <td className="border px-4 py-2 text-center">{formatDate(employee.bDate)}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleEdit(employee.id)} // Use empId here
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleDelete(employee.empId)} // Use empId here
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 col-span-8 text-center">No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
