import foodModel from "../models/foodModel.js";
import fs from 'fs'



// add food item

const addFood = async (req, res) => {
  
  let image_filename = `${req.file.filename}`;
  console.log("Image filename:", image_filename);

  console.log("Request body:", req.body);
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  })

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }

}


//list item
//iss function ka use karke hum dispaly  the all item in the database 
//all food list
const listFood = async(req,res)=>{
       try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
       } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
       }
}




// remove food item
const removeFood = async (req,res)=>{
   try {
    // this line use to find id
    const food = await foodModel.findById(req.body.id);
    //this line is use to delete in file 
    fs.unlink(`uploads/${food.image}`,()=>{})
    //this line use to delete in database
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
   } catch (error) {
       console.log(error);
       res.json({success:false,message:error})
   }
}


export { addFood,listFood,removeFood }















// const addFood = async (req, res) => {
//   // Check if file was uploaded
//   let image_filename = `${req.file.filename}`;
//   if (!image_filename) {
//     return res.status(400).json({ success: false, message: "No image file uploaded" });
//   }

//   // let image_filename = `${req.file.filename}`;

//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename
//   });

//   try {
//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Error saving food" });
//   }
// };
