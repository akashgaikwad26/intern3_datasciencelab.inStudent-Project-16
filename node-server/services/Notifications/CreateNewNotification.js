const { TABLE_NOTIFICATIONS } = require("../../Constants/Constants")
const pool = require("../../utils/GetPool")
const error = require("../../utils/error")

async function createNewNotification(){

    try {
        let query =`insert into ${TABLE_NOTIFICATIONS()}(user_id, message, type, is_read) values(2, 'A new task has been added: focusing on counting the number of live neighbors for cells in a grid, as part of the Game of Life.', 'new_task',false)`
        console.log(query)
        let result = await pool.query(query)
        console.log(result.rowCount)
    } catch (err) {
        console.log(err)
        return {messsage:err.messsage, status:500}
        // return error()
    }
}

// createNewNotification().then(res=>{
//     console.log(res)
// })