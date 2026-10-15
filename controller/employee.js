const database = require('../model/database.json')
const fs = require('fs')

const saveToDb = (data) =>{
    return new Promise((resolve, reject)=>{
         fs.writeFile('./model/database.json', data, (error, data)=>{
            if (error) {
                reject('Error writing to File')
            } else{
                resolve('File Written Successfully')
            }
        })
    })
}

const saveLogsToDb = (data) =>{
    return new Promise((resolve, reject)=>{
         fs.appendFile('./model/logger.txt',data, (error, data)=>{
            if (error) {
                reject('Error writing to File')
            } else{
                resolve('File Written Successfully')
            }
        })
    })
}

const allEmployees = (req, res) =>{
    const employee = database;
    res.status(200).json({
        message: "employee Read Successfully",
        data:employee
    }) 
}

const getEmployees = (req, res) => {
    const id = Number(req.params.id);
    const employee = database.find((employee) => employee.id === id);

    if (!employee) {
        return res.status(404).json({
            message: 'employee not found'
        });
    }

    res.status(200).json({
        message: 'employee Read successfully',
        data: employee
    });
};

const newEmployee = async(req, res) =>{
    const {name, age, gender, email, phoneNo, department, jobRole} = req.body

    if (!name || !age || !gender || !email || !department ||!jobRole) {
        return res.status(400).json({message: "Field is Required"})
    }
    
    if (typeof age !== "number") {
    return res.status(400).json({
        message: "Invalid age"
    });
}
    const employee = {
        id: database.length + 1,
        name,
        age,
        gender,
        email,
        phoneNo,
        department,
        jobRole
    }

    database.push(employee)
    await  saveToDb(JSON.stringify(database, null, 2))

    res.status(201).json({message: "Employee Created Successfully",
        data:employee
    })
}

const updateEmployee = async(req, res) =>{
    const id = Number(req.params.id);
    const employee = database.find((employee)=>employee.id === id)

    if (!employee) {
        return res.status(404).json({
            message: 'employee not found'
        })
    }
    
    if (req.body.name !== undefined) {
        employee.name = req.body.name
    }
    
    if (req.body.age !== undefined) {
        employee.age = req.body.age
    }

    if (req.body.gender !== undefined) {
        employee.gender = req.body.gender
    }

    if (req.body.email !== undefined) {
        employee.email = req.body.email
    }

    if (req.body.phoneNo !== undefined) {
        employee.phoneNo = req.body.phoneNo
    }

    if (req.body.department !== undefined) {
        employee.department = req.body.department
    }

    if (req.body.jobRole !== undefined) {
        employee.jobRole = req.body.jobRole
    }
    
    await  saveToDb(JSON.stringify(database, null, 2))

    res.status(201).json({message: "Employee Updated Successfully",
        data: employee
    })
}

const deleteEmployee = async(req, res) =>{
    const id = Number(req.params.id);
    const employee = database.find((employee)=>employee.id === id)

    if (!employee) {
        return res.status(404).json({
            message: 'employee not found'
        })
    }
    
    database.splice(database.indexOf(employee), 1)
    await  saveToDb(JSON.stringify(database, null, 2))

    res.status(200).json({message: "Employee Deleted Successfully"})
}


module.exports = {
    allEmployees,
    getEmployees,
    newEmployee,
    updateEmployee,
    deleteEmployee,
    saveLogsToDb
}