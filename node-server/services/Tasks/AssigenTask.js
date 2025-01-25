const { TABLE_TASKS } = require("../../Constants/Constants")
const error = require("../../utils/error")
const { getResponse } = require("../../utils/getResponse")
const { sendResponse } = require("../../utils/sendResponse")

async function assignTask(req, res){

    
    try {
        const {userId, taskid} = req.body
        let query = `update ${TABLE_TASKS()} set assigned_to = $1 where task_id = $2`
        const result = await getResponse(query,[userId, taskid])
        console.log(result)
        // sendResponse(res, result)
        
    } catch (err) {
        console.log(err)
        return error(res)
        
    }
}

// assignTask({body:{userId:2,taskid:8}})

module.exports={
    assignTask
}