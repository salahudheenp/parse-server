const Workdata = require('../models/Workdata');


// Function to list workdata without employees

async function listWorkdataWithoutEmployees() {
    try {
        const query = new Parse.Query('Workdata');
        query.doesNotExist('employee');
        const workdataWithoutEmployees = await query.find({ useMasterKey: true });
        console.log('Workdata without employees:', workdataWithoutEmployees);
        return workdataWithoutEmployees;
    } catch (error) {
        console.error('Error listing workdata without employees:', error);
        throw new Parse.Error(
            Parse.Error.INTERNAL_SERVER_ERROR,
            'Error listing workdata without employees'
        );
    }
}

module.exports = {
    listWorkdataWithoutEmployees,
};