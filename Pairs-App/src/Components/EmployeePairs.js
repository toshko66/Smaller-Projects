import React from "react";
import EmployeeProjectDetails from "./EmployeeProjectDetails";
import '../Styles/CSS/EmployeePairs.css';

function EmployeePairs({ rows }) {
    // Get unique employee IDs from the 'rows' data.
    const uniqueEmpIDs = [...new Set(rows.map((row) => row.EmpID))];
    //console.log(uniqueEmpIDs)

    // The 'calculateCommonProjectDuration' function calculates the total duration of common projects between two employees.
    const calculateCommonProjectDuration = (emp1, emp2) => {
      // Separete Array of object's listing the prjects in which the emps take part filtering them by ID
      const emp1Projects = rows.filter((row) => row.EmpID === emp1);
      const emp2Projects = rows.filter((row) => row.EmpID === emp2);
      let totalDuration = 0;
    // console.log(emp1Projects)

      // Loop through all projects of the first and second employee.
      emp1Projects.forEach((project1) => {
        emp2Projects.forEach((project2) => {
          // and checks if the ProjectID of the projects for both employees is the same, it's a common project.
          if (project1.ProjectID === project2.ProjectID) {
            // Find the time for common project.
            const startDate = new Date(
              Math.max(
                new Date(project1.DateFrom),
                new Date(project2.DateFrom)
              )
            );
            const endDate = new Date(
              Math.min(new Date(project1.DateTo), new Date(project2.DateTo))
            );
  
            // Calculate the duration date range in days.
            const projectDuration =
              (Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24));

            totalDuration += projectDuration;
          }
        });
      });
  
      return totalDuration;
    };
  
    // The 'findLongestDurationPair' function finds the pair of employees who have worked together on common projects for the longest period of time.
    const findLongestDurationPair = () => {
      let longestPair = [];
      let longestDuration = 0;
  
      // Loop through all unique employee pairs.
      for (let i = 0; i < uniqueEmpIDs.length; i++) {
        const emp1 = uniqueEmpIDs[i];
        for (let j = i + 1; j < uniqueEmpIDs.length; j++) {
          const emp2 = uniqueEmpIDs[j];
          
          // Calculate the total duration of common projects between the current employee pair.
          const duration = calculateCommonProjectDuration(emp1, emp2);
  
          // If the current duration is longer than the longest duration found so far, update the longest duration and longest pair.
          if (duration > longestDuration) {
            longestDuration = duration;
            longestPair = [emp1, emp2];
          }
        }
      }
  
      // Return the employee pair with the longest duration of working together on common projects.
      return { pair: longestPair, duration: longestDuration };
    };

    const result = findLongestDurationPair();

    return (
        <div className="output-wrapper">
        <h2>Employees who have worked
    together on common projects for the longest period of time</h2>
        <p>
            Employee pair:<span> {result.pair[0]} </span> and<span> {result.pair[1]} </span>  <br />
            Duration: {result.duration} days
        </p>
        <EmployeeProjectDetails
            rows={rows}
            emp1={result.pair[0]}
            emp2={result.pair[1]}
        />
        </div>
    );
}

export default EmployeePairs;
