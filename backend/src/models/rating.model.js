import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true,
    },
    score:{
        type:Number,
        
        
    }
})

const Rating = mongoose.model('Rating', ratingSchema)

export default Rating;