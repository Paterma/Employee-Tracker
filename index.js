// const inquirer = require("inquirer");
// const db = require ("./server.js")


// //initial prompt
// inquirer.prompt([
//     {
//         type: "list",
//         message: "What would you like to do?",
//         choices: ["View All Employees", "Add Employees", "Update Employee role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
//         name: "initalQ",
//     },
// ]) .then(data => {
//     if (data.initialQ === "View All Employees") {
//         viewEmployees()
//     }
// })
// function viewEmployees(){
//     db.query('SELECT * FROM employee', function (err, results) {
//         // console.table(results);
//         console.log(results)
//         });
// }

