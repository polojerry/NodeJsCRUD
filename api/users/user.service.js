const pool = require("../../config/database");

module.exports = {
    create: (data, callBack)=>{
        pool.query(
            `insert into user_details(firstName, lastName, email, password)
            values(?,?,?,?)`,
            [data.firstName,
                data.lastName,
                data.email,
                data.password
            ],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    }
}