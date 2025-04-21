import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

// const orderSchema = new mongoose.Schema({
//     userId:{type:String},
//     items:{type:Array},
//     amount:{type:Number},
//     address:{type:Object,},
//     status:{type:String},
//     date:{type:Date},
//     payment:{type:Boolean,default:false}
// })
const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);

// 4000 0035 6000 0008
export default orderModel;