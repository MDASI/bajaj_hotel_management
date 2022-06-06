const express = require("express");
const router = express.Router();
const Room = require("../models/room")
const mongoose = require("mongoose");


/**@swagger
  * /getallrooms:
  *  get:
  *   description: Api for getting all rooms
  *   responses:
  *      "200":
  *        description: succesfully 
  */

router.get("/getallrooms", async (req, res) => {
   
     try {
          const rooms = await Room.find()
     res.send(rooms)
     } catch (error) {
          return res.status(400).json({ message: 'something went wrong' });
     }

});

/**@swagger
  * /getroombyid:
  *  post:
  *   description: Api for getting room by id
  *   responses:
  *      "200":
  *        description: succesfully 
  */
router.post("/getroombyid", async(req, res) => {
     console.log(req.body);
     try {
          const room = await Room.findOne({'_id' : req.body.roomid})
          res.send(room)
     } catch (error) {
          return res.status(400).json({ message: error });
     }
});


router.get("/getallrooms", async(req, res) => {
     console.log(req.body);
     try {
          const rooms = await Room.find({})
          res.send(rooms)
     } catch (error) {
          return res.status(400).json({ message: error });
     }
});


/**@swagger
  * /addroom:
  *  post:
  *   description: Api for adding new rooms
  *   responses:
  *      "200":
  *        description: room added succesfully 
  */
router.post("/addroom", async(req, res) => {
  const { room , 
     rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3} = req.body

     const newroom = new Room({name : room,rentperday:rentperday, 
          maxcount:maxcount , description:description , phonenumber:phonenumber , type:type , imageurls:[image1 , image2 ,image3] , currentbookings:[]
     })
     try {
          await newroom.save()
          res.send('New Room Added Successfully')
     } catch (error) {
          return res.status(400).json({ error });
     }
});


module.exports = router