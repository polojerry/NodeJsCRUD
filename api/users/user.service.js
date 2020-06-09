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

    getUsers: callback=>{
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

    getUserById: (user_id, callback)=>{
        pool.query(`SELECT firstName,lastName,email,password FROM user_details WHERE user_id =?`,
        [user_id],
        (err, res,fields)=>{
            if(err){
                return callback(err);
            }

            return callback(null,res[0]);
        }
        );
    },

    updateUser: (data, callBack)=>{
        pool.query(`UPDATE user_details set firstName=?,lastName=?,email=?, password=? WHERE user_id =?`,
        [
            data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.user_id
        ],
        (err, res, fields)=>{
            if(err){
                return callBack(err);
            }

            return callBack(null, res[0]);
        }

        );
    },

    deleteUser: (data, callBack)=>{
        pool.query(`DELETE from user_details WHERE user_id=?`,
        [data.user_id],
        (err, res)=>{
            if(err){
                return callBack(err);
            }

            return callBack(null,res[0]);
        }
        );
    },

    getUserByEmail : (email, callBack)=>{
        pool.query(`SELECT * FROM user_details WHERE email=?`,
        [email],
        (err, res, fields)=>{
            if(err){
                console.log(err);
                return callBack(err);
            }

            return callBack(null, res[0]);
        });

    }
}