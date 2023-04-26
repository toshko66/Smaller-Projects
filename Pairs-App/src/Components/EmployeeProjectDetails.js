import React from "react";
import '../Styles/CSS/EmployeeDetailsTable.css';

function EmployeeProjectDetails({ rows, emp1, emp2 }) {
    // Separete Array of object's listing the prjects in which the emps take part filtering them by ID
    const emp1Projects = rows.filter((row) => row.EmpID === emp1);
    const emp2Projects = rows.filter((row) => row.EmpID === emp2);

    // Calculate the common projects between employee 1 and employee 2 using the 'map' and 'filter' 
    const commonProjects = emp1Projects.map((project1) => {
        // Find the mutual project for employee 2 with the same ProjectID as the current project for employee 1
        const project2 = emp2Projects.find(
            (project) => project.ProjectID === project1.ProjectID
        );

        // If a common project is found
        if (project2) {
            // Calculate the start date and end date of the overlapping period for the common project
            const startDate = new Date(
                Math.max(new Date(project1.DateFrom), new Date(project2.DateFrom))
            );
            const endDate = new Date(
                Math.min(new Date(project1.DateTo), new Date(project2.DateTo))
            );

            // Calculate the duration of the overlapping period in days
            const duration =
                (Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24));

            // Return the common project with its overlapping start date, end date, and duration
            return { ...project1, DateFrom: startDate, DateTo: endDate, duration };
        }

        // If a common project is not found, return null
        return null;
    }).filter(project => project !== null); // Filter out the null values from the 'commonProjects' array

    // Render the component
    return (
        <div className="table-wrapper">
            <h3>Common Projects</h3>
            <table>
                <thead>
                    <tr>
                        <th>ProjectID</th>
                        <th>Duration (days)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iterate over the 'commonProjects' array and render a table row for each common project */}
                    {commonProjects.map((project) => (
                        <tr key={project.ProjectID}>
                            <td>{project.ProjectID}</td>
                            <td>{project.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Export the EmployeeProjectDetails component as the default export
export default EmployeeProjectDetails;
