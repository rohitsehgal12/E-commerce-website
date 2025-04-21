import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://20rohitsehgal:701580@cluster0.orw4pih.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}