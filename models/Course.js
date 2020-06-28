const mongoose=require('mongoose');
const{Schema,model:Model}=mongoose;
const{String,Number,ObjectId,Boolean}=Schema.Types;

const CourseSchema=new Schema({
    title:{
        type:String,
        required:[true,'Please enter the title!'],
        unique:true,
        minlength:[4,'Title should be at least 4 symbols']
    },
    description:{
        type:String,
        required:[true,'Please enter description!'],
        minlength:[4,'Description should be  at least 20 symbols'],
        maxLength:[50,'Description should be 50 symbols max!']
    },
    imageUrl:{
        type:String,
        required:[true, 'Image URL is required!']
    },
    isPublic:{
        type:Boolean,
        required:true,
        default:false
    },
    createdAt:{
        type:String,
        required:[true,'Created at input is required!']
       
    },
    creator:{
        type:ObjectId,
        ref:'User'
    },
    
    usersEnrolled:[{
        type:ObjectId,
        ref:'User'
    }]

})

module.exports=new Model('Course', CourseSchema);