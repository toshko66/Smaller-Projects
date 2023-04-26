import React, { useState } from "react";
import EmployeePairs from "./EmployeePairs";
import '../Styles/CSS/CsvReader.css';

function CsvReader() {
    // The state 'rows' is used to store the data from the CSV file.
    const [rows, setRows] = useState([]);

    // The 'handleFileUpload' function handles the file input change event.
    function handleFileUpload(event) {
        // Check if the files array is not empty
        if (event.target.files.length > 0) {
            // Get the selected file from the input element.
            const file = event.target.files[0];
            const reader = new FileReader();

            // The 'onload' event is triggered when the file content is read.
            reader.onload = (event) => {
                // Get the content of the file.
                const content = event.target.result;

                // Trims all of the excess symbols such as ' "" and " "
                // With this function, we're "cleaning" the CSV file.
                function cleanCell(cell) {
                    return cell.trim().replace(/['"]+/g, '');
                }

                // Split the content of the file into an array of rows.
                const rows = content.trim().split("\n").map((row) =>
                    row.split(",").map((cell) => cleanCell(cell))
                );

                // Map over each row and replace any 'NULL' values in the third cell with the current date.
                const updatedRows = rows.map((row) => {
                    const [EmpID, ProjectID, DateFrom, DateTo] = row.map((cell, index) => {
                        if ((index + 1) % 4 === 0 && cell === "NULL") {
                            const now = new Date();
                            const year = now.getFullYear();
                            const month = now.getMonth() + 1;
                            const day = now.getDate();
                            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
                            return formattedDate;
                        } else {
                            return cell;
                        }
                    });

                    return { EmpID, ProjectID, DateFrom, DateTo };
                });

                // Set the state of 'rows' to the updated rows
                setRows(updatedRows);
                console.log(updatedRows)
            };

            // Read the content of the file as text.
            reader.readAsText(file);
        }
    }

    return (
        <div className="csv-wrapper">
            <div className="left">
                <p>Welcome,<br></br>to my application.<br></br>
                    <span> Please, upload your CSV file below. </span>
                </p>
                <input type="file" onChange={handleFileUpload} accept="CSV" required />
            </div>
            <div className="right">
                <p>Results:</p>
                {rows.length > 0 && <EmployeePairs rows={rows} />}
            </div>
        </div>
    );
}

export default CsvReader;
