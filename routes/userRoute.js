const express = require("express");
const router = express.Router();
const User = require("../models/user")

/** 
  * @swagger
  * definitions:
  *  Employee:
  *   type: object
  *   properties:
  *    name:
  *     type: string
  *     description: name of the employee
  *     example: 'Asif'
  *    email:
  *     type: string
  *     description: name of the employee
  *     example: 'asif3@gmail.com'
  *    password:
  *     type: password
  *     description: password of user
  *     example: 'aK31234h'
  */ 

/**@swagger
  * /register:
  *  post:
  *   description: create a user for the hotel
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Employee'
  *    responses:
  *      200:
  *       description: user created succesfully
  *      400:
  *       description: failure in creating employee  *  
  */


router.post("/register", async(req, res) => {
  
    const {name , email , password} = req.body

    const newUser = new User({name , email , password})

    const oldemail=await User.find({email:email})
    try {
        if(oldemail.length>0)
        {
            return res.status(400).json({ message: "user already exit" });
        }
        else{
        newUser.save()
        res.send('User Registered successfully')
        
         }    
       } catch (error) {
         return res.status(400).json({ message: error });
    }

});
/** 
  * @swagger
  * definitions:
  *  Employee2:
  *   type: object
  *   properties:
  *    email:
  *     type: string
  *     description: name of the employee
  *     example: 'ao@gmail.com'
  *    password:
  *     type: password
  *     description: password of user
  *     example: 'aK788955'
  */
/**@swagger
  * /login:
  *  post:
  *   description: create a user for the hotel
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Employee2'
  *    responses:
  *      200:
  *       description: login succesfully
  *      400:
  *       description: failure in creating employee
  */
router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {
        
        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name , 
                email : user[0].email, 
                isAdmin : false, 
                _id : user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});

/**@swagger
  * /getallusers:
  *  get:
  *   description: we will get all user
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Employee2'
  *    responses:
  *      200:
  *       description:succesfull
  *      400:
  *       description: failure in creating employee
  */
router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});
/**@swagger
  * /deleteuser:
  *  post:
  *   description: we can delete a user
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Employee2'
  *    responses:
  *      200:
  *       description: user deleted succesfully
  *      400:
  *       description: failure in creating employee
  */
router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});



module.exports = router