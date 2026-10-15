const {saveLogsToDb} = require ('../controller/employee')

const logger = async (req,res, next) => {
    const date = new Date()


    const result = `\nAPI with Endpoint ${req.url} and method: ${req.method} was called at ${date.toLocaleString()}`

    await saveLogsToDb(result)

    next()
}
 
module.exports = logger