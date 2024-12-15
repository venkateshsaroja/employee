import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Edit({ selectedEmployee, setEmployees, setISEditing, employees }) {
  const [formData, setFormData] = useState({
    empId: selectedEmployee ? selectedEmployee.empId : '',
    fname: selectedEmployee ? selectedEmployee.fname : '',
    lname: selectedEmployee ? selectedEmployee.lname : '',
    email: selectedEmployee ? selectedEmployee.email : '',
    salary: selectedEmployee ? selectedEmployee.salary : '',
    bDate: selectedEmployee ? selectedEmployee.bDate : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data being submitted:", formData);
    axios.put(`https://localhost:7259/api/Employee/${formData.empId}`, formData)
      .then((response) => {
        console.log("Response from PUT request:", response);
        if (response.status === 200) {
          const updatedEmployees = employees.map(emp =>
            emp.empId === formData.empId ? formData : emp
          );
          setEmployees(updatedEmployees);

          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${formData.fname} ${formData.lname}'s details have been updated.`,
            showConfirmButton: false,
            timer: 1500
          });

          setISEditing(false);
        } else {
          // Handle unsuccessful update (if the response isn't 200)
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${formData.fname} ${formData.lname}'s details have been updated.`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((error) => {
        // Handle error in the API call
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error updating the employee details.',
        });
        console.error("Error updating employee details:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 opacity-100">
        <h2 className="text-2xl font-bold mb-6">Edit Employee Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bDate" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="bDate"
              name="bDate"
              value={formData.bDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setISEditing(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
