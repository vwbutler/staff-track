const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "employee_tracker_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to view all departments
async function viewAllDepartments() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute SQL query to retrieve departments
    const [rows] = await connection.query("SELECT * FROM department");

    // Release the connection back to the pool
    connection.release();

    // Display departments in a formatted table
    console.table(rows);
    // Additional code for further actions or prompts
    displayMainMenu();
  } catch (err) {
    console.error("An error occurred while retrieving departments:", err);
    displayMainMenu();
  }
}

// Function to view all roles
async function viewAllRoles() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute SQL query to retrieve roles
    const [rows] = await connection.query("SELECT * FROM role");

    // Release the connection back to the pool
    connection.release();

    // Display roles in a formatted table
    console.table(rows);
    // Additional code for further actions or prompts
    displayMainMenu();
  } catch (err) {
    console.error("An error occurred while retrieving roles:", err);
    displayMainMenu();
  }
}

// Function to view all employees
async function viewAllEmployees() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute SQL query to retrieve employees
    const [rows] = await connection.query("SELECT * FROM employee");

    // Release the connection back to the pool
    connection.release();

    // Display employees in a formatted table
    console.table(rows);
    // Additional code for further actions or prompts
    displayMainMenu();
  } catch (err) {
    console.error("An error occurred while retrieving employees:", err);
    displayMainMenu();
  }
}

// Function to add a department
async function addDepartment() {
  try {
    // Prompt user for department details
    const { departmentName } = await inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department:",
      },
    ]);

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute SQL query to insert new department
    await connection.query("INSERT INTO department (name) VALUES (?)", [
      departmentName,
    ]);

    // Release the connection back to the pool
    connection.release();

    console.log("Department added successfully.");
    // Additional code for further actions or prompts
    displayMainMenu();
  } catch (err) {
    console.error("An error occurred while adding a department:", err);
    displayMainMenu();
  }
}

// Function to add a role
async function addRole() {
  try {
    // Prompt user for role details
    const { roleName, salary, departmentId } = await inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the role:",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter the department ID for the role:",
      },
    ]);

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute SQL query to insert new role
    await connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [roleName, salary, departmentId]
    );

    // Release the connection back to the pool
    connection.release();

    console.log("Role added successfully.");
    // Additional code for further actions or prompts
    displayMainMenu();
  } catch (err) {
    console.error("An error occurred while adding a role:", err);
    displayMainMenu();
  }
}

// Function to add an employee
async function addEmployee() {
  try {
    // Prompt user for employee details
    const { firstName, lastName, roleId } = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employees first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employees last name:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID for the employee:",
      },
    ]);

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute SQL query to insert new employee
    await connection.query(
      "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
      [firstName, lastName, roleId]
    );

    // Release the connection back to the pool
    connection.release();

    console.log("employee added successfully.");
    // Additional code for further actions or prompts
    displayMainMenu();
  } catch (err) {
    console.error("An error occurred while adding an employee:", err);
    displayMainMenu();
  }
}
// Function to update an employee
async function updateEmployee() {
  try {
    // Prompt user for employee ID and updated information
    const { employeeId, firstName, lastName, roleId } = await inquirer.prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee you want to update:",
      },
      {
        type: "input",
        name: "firstName",
        message: "Enter the new first name for the employee:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the new last name for the employee:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the new role ID for the employee:",
      },
    ]);

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute SQL query to update the employee
    await connection.query(
      "UPDATE employee SET first_name = ?, last_name = ?, role_id = ? WHERE id = ?",
      [firstName, lastName, roleId, employeeId]
    );

    // Release the connection back to the pool
    connection.release();

    console.log("Employee updated successfully.");

    displayMainMenu();
  } catch (err) {
    console.error("An error occurred while updating the employee:", err);
    displayMainMenu();
  }
}

function displayMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.choice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
        case "Exit":
          process.exit();
          break;
      }
    });
}

// Call the main menu function to start the application
displayMainMenu();
