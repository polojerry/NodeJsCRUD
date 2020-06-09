const {create, getUsers, getUserById, updateUser, deleteUser} = require("../users/user.service")
const {genSaltSync, hashSync} = require("bcrypt")

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
            
            return res.json({
                success:1,
                message: "User Deleted Succesfully"
            });
        }
        );

    },






}