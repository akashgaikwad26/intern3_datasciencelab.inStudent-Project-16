const { user } = require("../Config/config")
const { TABLE_TASKS, TABLE_USERS, TABLE_NOTIFICATIONS } = require("../Constants/Constants")
const errorHandler = require("../utils/errorHandler")
const { getResponse } = require("../utils/getResponse")

async function getProjectDeadlineNotification(){

    try {
        let query = `insert into ${TABLE_NOTIFICATIONS()}(user_id, message, type, is_read) select assigned_to ,'Deadline for project is in '||deadline- current_date||' days'  description, 'deadline' ,false as is_read  from collabration.projects p inner join ${TABLE_TASKS()} as tt
            on p.project_id = tt.project_id
        where deadline <=current_date+interval '4 days' and deadline>= current_date and assigned_to is not null`
        const result = await getResponse(query,[])
        console.log(result.rows)
    } catch (error) {
        console.log(error)
        // errorHandler(res,)
        
    }
}

async function getTaskDeadLineNotification(){
    try {
        let query = `insert into ${TABLE_NOTIFICATIONS()}(user_id, message, type, is_read) select assigned_to ,'Deadline for task is in '||due_date- current_date||' days'  description, 'deadline' ,false as is_read  from  ${TABLE_TASKS()} as tt
        where due_date <=current_date+interval '1 days' and due_date>= current_date and assigned_to is not null`
        const result = await getResponse(query,[])
        console.log(result.rows)
    } catch (error) {
        console.log(error)
        // errorHandler(res,)
        
    }
}

async function getTaskAssignedNotificationToUser(){

    try {
        let query = `insert into ${TABLE_NOTIFICATIONS()}(user_id, message, type, is_read) select assigned_to ,'New task add : in '||description, 'new_task' ,false as is_read
        from  ${TABLE_TASKS()} as tt
              where created_at::date =current_date and due_date>= current_date and assigned_to is not null`
        // const result = await getResponse(query,[])
        console.log(query)
        console.log(result.rows)
    } catch (error) {
        console.log(error)
        // errorHandler(res,)
        
    }
}
// getTaskAssignedNotificationToUser()
// getTaskDeadLineNotification()
// getProjectDeadlineNotification()


async function notificationCronJob(){
    console.log('#####  adding notifications')
    getProjectDeadlineNotification()
    getTaskDeadLineNotification()
    getTaskAssignedNotificationToUser
    console.log('#####  notifications added')
} 
module.exports={
    getTaskDeadLineNotification,
    getProjectDeadlineNotification,
    notificationCronJob
}