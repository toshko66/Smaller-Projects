### Project Description
The project is a web application built using React that identifies the pair of employees who have worked together on common projects for the longest period of time and the time for each of those projects. The input data for the application is a CSV/{every other data format} file containing information about employee IDs, project IDs, and dates worked. The output of the application is the IDs of the employees who have worked together the longest, along with the project ID and the time spent on the project. 

### Installation
Clone the repository: git clone https://gitss.sirma.com/sirma-academy-january-2023/js-todor-velichkov.git
Install the dependencies: npm install
### Usage
Run the development server: npm start
Open http://localhost:3000 in a web browser to view the app.

### Algorithm breakdown 
1. Read the input data from the CSV file. 
2. Group the data by EmpID
3. For each EmpID group, find all the unique pairs of EmployeeIDs who have worked on that project.
4. For each unique EmployeeID pair, calculate the number of days they worked together on the project.
5. Identify the EmployeeID pair with the longest working period, and output their EmployeeIDs and the time spent on the project.

### Additional information
In the branch along with the Pairs-app, I have uploaded 2 Csv files which I used to test the app incase it doesn't work with the aimed Csv file.


