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
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES e_role(id)
  ON DELETE SET NULL
);
-- need to be able to see the role with employee, need to see dept for creating a role. 
-- need to create helper functions that are getting things out of the database (select all), need to return the array were given back as the choices array in my inquirer question. The only way to see the list is to get it an return it. 
-- dont return the array dynamically- do it with an empty variable [] const role = [], role array is the choices

--[{name: thing you see, value: id}]
--for (let i = 0; i < results.length; i++) {
--roles.push({name: results[i].title, value:results[i].id }) 
--}