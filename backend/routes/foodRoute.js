import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js"
// use to store image
import multer from "multer"

//use to create get method, post method and any other 
const foodRouter = express.Router();

// image storage engine  , cb means call back and filename is always is umique through this method 
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
}) 

const upload = multer({storage:storage})


//use to send data in server
foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);



export default foodRouter;