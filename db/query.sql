SELECT * FROM work_info
JOIN work_info ON e_role.work_info = role.id
JOIN work_info ON employee.work_info = employee.id;



-- employee.first_name (what you want to see) when done listing- FROM employee LEFT JOIN e_role ON employee.role_id=e_role.id
