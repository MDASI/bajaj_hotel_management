const express = require("express");
//var cors = require('cors')
//const { getMaxListeners } = require("../models/room");
const router = express.Router();

/**@swagger
  * /adminlogin:
  *  post:
  *   description: Api for admin Login
  *   responses:
  *      "200":
  *        description: admin login succesfully 
  */
router.post("/adminlogin", async(req, res) => {

    const {email , password} = req.body 
    try {

        if(email==="admin@gmail.com" && password==='1234')
       {       
        /*const token="aaaaaaaaaaaaaaaaaaaaaaaaaa";
        cookie("jwt",token,{
            expires:new Date(Date.now()+600000),
            httpOnly:true});*/
        const currentUser = {
                name : "admin", 
                email : 'admin@gmail.com', 
                isAdmin : true, 
                _id : '6280aacadb06af79280c9eec'
                
            }
        res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }
    }
   
     catch (error) {
           return res.status(400).json({ message: 'Something went wrong' });
    }
  
});
module.exports= router;