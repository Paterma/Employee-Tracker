DROP DATABASE IF EXISTS work_info;
CREATE DATABASE work_info;

USE work_info;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE e_role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NULL,
  salary DECIMAL
  department_id INT
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT
  manager_id INT
  FOREIGN KEY (e_role)
  REFERENCES role(id)
  ON DELETE SET NULL
);