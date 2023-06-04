const Employee = require('../models/Employee');
const Workdata = require('../models/Workdata');

async function createTables() {
    try {
        // Check if "employee" table exists
        const employeeQuery = new Parse.Query(Employee);
        await employeeQuery.first({ useMasterKey: true });

        // Check if "workdata" table exists
        const workdataQuery = new Parse.Query(Workdata);
        await workdataQuery.first({ useMasterKey: true });

        return 'Tables already exist';
    } catch (error) {
        if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
            // Create "employee" table
            const employee = new Employee();
            employee.set('id', '');
            employee.set('name', '');
            employee.set('gender', '');
            employee.set('age', '');
            employee.set('workData', null);
            await employee.save(null, { useMasterKey: true });

            // Create "workdata" table
            const workdata = new Workdata();
            workdata.set('salary', 0);
            workdata.set('joiningDate', new Date());
            await workdata.save(null, { useMasterKey: true });

            return 'Tables created successfully';
        } else {
            console.error('Error checking/creating tables:', error);
            throw new Parse.Error(
                Parse.Error.INTERNAL_SERVER_ERROR,
                'Error checking/creating tables'
            );
        }
    }
}

async function generateRandomEmployeeDetails() {
    const numEmployees = 500;

    try {
        const employees = [];

        for (let i = 0; i < numEmployees; i++) {
            const employee = new Parse.Object('Employee');
            employee.set('id', generateRandomId());
            employee.set('name', generateRandomName());
            employee.set('gender', generateRandomGender());
            employee.set('age', generateRandomAge());

            const workdata = await createWorkdata();
            employee.set('workData', workdata);

            employees.push(employee);
        }

        await Parse.Object.saveAll(employees, { useMasterKey: true });
        console.log(`Generated ${numEmployees} random employee records`);

        return `Generated ${numEmployees} random employee records`;
    } catch (error) {
        console.error('Error generating random employees:', error);
        throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, 'Error generating random employees');
    }
}


// Function to delete random employee records

async function deleteRandomEmployees() {
    const numEmployeesToDelete = 100;

    try {
        const query = new Parse.Query('Employee');
        query.limit(numEmployeesToDelete);
        query.withCount();
        const { count, results } = await query.find({ useMasterKey: true });

        const employeesToDelete = results;

        await Parse.Object.destroyAll(employeesToDelete, { useMasterKey: true });
        console.log(`Deleted ${count} random employee records`);

        return `Deleted ${count} random employee records`;
    } catch (error) {
        console.error('Error deleting random employees:', error);
        throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, 'Error deleting random employees');
    }
}


// Function to delete random workdata records

async function deleteRandomWorkdata() {
    const numWorkdataToDelete = 100;

    try {
        const query = new Parse.Query('Workdata');
        query.limit(numWorkdataToDelete);
        query.withCount();
        const { count, results } = await query.find({ useMasterKey: true });

        const workdataToDelete = results;

        await Parse.Object.destroyAll(workdataToDelete, { useMasterKey: true });
        console.log(`Deleted ${count} random workdata records`);

        return `Deleted ${count} random workdata records`;
    } catch (error) {
        console.error('Error deleting random workdata records:', error);
        throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, 'Error deleting random workdata records');
    }
}
// Function to list employees without workdata

async function listEmployeesWithoutWorkdata() {
    try {
        const query = new Parse.Query('Employee');
        query.doesNotExist('workData');
        const employeesWithoutWorkdata = await query.find({ useMasterKey: true });
        console.log('Employees without workdata:', employeesWithoutWorkdata);
        return employeesWithoutWorkdata;
    } catch (error) {
        console.error('Error listing employees without workdata:', error);
        throw new Parse.Error(
            Parse.Error.INTERNAL_SERVER_ERROR,
            'Error listing employees without workdata'
        );
    }
}

module.exports = {
    createTables,
    generateRandomEmployeeDetails,
    deleteRandomEmployees,
    deleteRandomWorkdata,
    listEmployeesWithoutWorkdata,
};
