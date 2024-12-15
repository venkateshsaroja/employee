import Swal from "sweetalert2";
import axios from "axios";

import Header from "./Header";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import { useState, useEffect } from "react";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setISEditing] = useState(false);

  // Fetch employees when the component mounts
  useEffect(() => {
    axios
      .get("https://localhost:7259/api/Employee") // Replace with your API URL
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const handleEdit = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    setSelectedEmployee(employee);
    setISEditing(true);
  };

  const handleDelete = (empId) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make DELETE request to the API
        debugger
        axios
          .delete(`https://localhost:7259/api/Employee/${empId}`) // Replace with correct API URL
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Employee has been deleted.",
              showConfirmButton: false,
              timer: 1500,
            });
  
            // Remove the deleted employee from the state
            setEmployees((prevEmployees) =>
              prevEmployees.filter((employee) => employee.empId !== empId)
            );
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "There was an error deleting the employee.",
            });
          });
      }
    });
  };
  
  
  

  const addEmployee = (newEmployee) => {
    axios
      .post("https://localhost:7259/api/Employee", newEmployee) // Replace with your API URL
      .then((response) => {
        setEmployees([...employees, response.data]);
        setIsAdding(false);
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error adding the employee.",
        });
      });
  };

  const updateEmployee = (updatedEmployee) => {
    axios
      .put(
        `https://localhost:7259/api/Employee/${updatedEmployee.id}`,
        updatedEmployee
      ) // Replace with your API URL
      .then(() => {
        const updatedEmployees = employees.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        setEmployees(updatedEmployees);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s details have been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setISEditing(false);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error updating the employee details.",
        });
      });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}

      {isAdding && (
        <>
          <Add addEmployee={addEmployee} setIsAdding={setIsAdding} />
        </>
      )}

      {isEditing && (
        <>
          <Edit
            selectedEmployee={selectedEmployee}
            updateEmployee={updateEmployee}
            setISEditing={setISEditing}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
