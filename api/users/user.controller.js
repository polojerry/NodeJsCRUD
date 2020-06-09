const {create, getUsers, getUserById, updateUser, deleteUser, getUserByEmail} = require("../users/user.service")
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {sign} = require("jsonwebtoken")

module.exports= {
    createUser : (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body,(err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Erorr"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results 
            });
        });

    },

    getUserByUserId : (req, res)=>{
        const userId = req.params.user_id;
        getUserById(userId, (err, results)=>{
            if(err){
                console.log(err);
            }

            if(!results){
                return res.json({
                    success : 0,
                    message : "Record Not Found"
                });
            }

            return res.json({
                success:1,
                data: results
            });
        }
        );

    },

    getUsers : (req, res)=>{
        getUsers((err, results)=>{
            if(err){
                console.log(err)
            }
            return res.json({
                success: 1,
                data : results

            });
        });
    },

    updateUser : (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body,(err, results)=>{
            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.json({
                    success:0,
                    message: "Failed to Update User"
                });
            }

            return res.json({
                success: 1,
                message: "Updated Sucessfully" 
            });
        });

    },
    
    deleteUser : (req, res)=>{
        const body = req.body;
        deleteUser(body, (err, results)=>{
            if(err){
                console.log(err);
            }

            if(!results){
                return res.json({
                    success:0,
                    message: "Failed to Delete User"
                });
            }

            return res.json({
                success:1,
                message: "User Deleted Succesfully"
            });
        }
        );

    },

    loginuser: (req, res)=>{
        const body = req.body;
        getUserByEmail(body.email, (err, results)=>{
            if(err){
                console.log(err);
            }

            if(!results){
                return res.json({
                    success: 0,
                    message : "Invalid Email or Password"
                });
            }

            const result = compareSync(body.password, results.password)
            
            if(result){
                results.password == undefined
               const jsonToken =sign({result : results}, "babalao",{
                   expiresIn: "1h"
               });

               return res.json({
                   success:1,
                   message: "Login Succesfull",
                   token : jsonToken
               });
            }else{
                return res.json({
                    success: 0,
                    message : "Invalid Email or Password"
                });

            }
        });

    }

}