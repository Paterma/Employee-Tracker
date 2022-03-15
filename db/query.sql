SELECT * FROM work_info
JOIN work_info ON e_role.work_info = role.id
JOIN work_info ON employee.work_info = employee.id;
