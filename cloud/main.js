const EmployeeController = require('../controllers/employeeController');
const WorkdataController = require('../controllers/workdataController');

Parse.Cloud.define('createTables', EmployeeController.createTables);
Parse.Cloud.define(
    'generateRandomEmployeeDetails',
    EmployeeController.generateRandomEmployeeDetails
);
Parse.Cloud.define(
    'deleteRandomEmployees',
    EmployeeController.deleteRandomEmployees
);
Parse.Cloud.define(
    'deleteRandomWorkdata',
    EmployeeController.deleteRandomWorkdata
);
Parse.Cloud.define(
    'listEmployeesWithoutWorkdata',
    EmployeeController.listEmployeesWithoutWorkdata
);
Parse.Cloud.define(
    'listWorkdataWithoutEmployees',
    WorkdataController.listWorkdataWithoutEmployees
);
