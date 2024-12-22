import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getEmployeeDetails } from 'wasp/client/operations';

const EmployeeDetailsPage = () => {
  const { employeeId } = useParams();
  const { data: employee, isLoading, error } = useQuery(getEmployeeDetails, { id: employeeId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{employee.name}</h2>
        <p><strong>Personal Info:</strong> {employee.personalInfo}</p>
        <p><strong>Employment Status:</strong> {employee.employmentStatus}</p>
        <p><strong>Emergency Contact:</strong> {employee.emergencyContact}</p>

        <h3 className="text-lg font-semibold mt-4">Associated Projects</h3>
        <ul className="list-disc pl-5">
          {employee.projects.map(project => (
            <li key={project.id}>
              <strong>{project.name}</strong>: {project.description} (Status: {project.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmployeeDetailsPage;
