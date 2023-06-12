-- sample data for department table
INSERT INTO department (id, name)
VALUES
  (1, 'Information Technology'),
  (2, 'Marketing'),
  (3, 'Human Resources');

-- sample data for role table
INSERT INTO role (id, title, salary, department_id)
VALUES
  (1, 'IT Manager', 60000, 1),
  (2, 'Business Systems Analyst', 40000, 1),
  (3, 'Marketing Manager', 55000, 2),
  (4, 'Marketing Specialist', 35000, 2),
  (5, 'HR Manager', 65000, 3),
  (6, 'HR Coordinator', 30000, 3);

-- sample data for employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'Larry', 'David', 1, NULL),
  (2, 'William', 'Harrison', 2, 1),
  (3, 'Zach', 'Taylor', 3, NULL),
  (4, 'Emily', 'Garfield', 4, 3),
  (5, 'David', 'Kennedy', 5, NULL),
  (6, 'Lola', 'Roosevelt', 6, 5);
