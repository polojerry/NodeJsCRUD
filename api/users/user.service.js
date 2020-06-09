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
                return callBack(null, results);
            }
        );
    },

    getUsers: (data, callback)=>{
        pool.query(
            `SELECT firstName,lastName,email,password FROM user_details`,
            [],
            (err, res,fields)=>{
                if(err){
                    return callback(err);
                }
                return callback(null,res);
            }
        );
    },

    getUserById: (data, callback)=>{
        pool.query(`SELECT firstName,lastName,email,password FROM user_details WHERE use_id =?`,
        [data.user_id],
        (err, res,fields)=>{
            if(err){
                return callback(err);
            }

            return callback(null,res[0]);
        }
        );
    },

    updateUser: (data, callBack)=>{
        pool.query(`UPDATE user_details set firstName = ?,lastName = ?,email = ?, password WHERE use_id =?`,
        [
            data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.user_id
        ],
        (err, res)=>{
            if(err){
                return callBack(err);
            }

            return callBack(null, res[0]);
        }

        );
    },

    deleteUser: (data, callBack)=>{
        pool.query(`DELETE from user_details WHERE id=?`,
        [data.user_id],
        (err, res)=>{
            if(err){
                return callBack(err);
            }

            return callBack(null,res[0]);
        }
        );
    }
}