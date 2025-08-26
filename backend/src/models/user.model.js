import mongoose from "mongoose"

const ratingSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true,
    },
    score:{
        type:Number,
        default:0,
        min: 0,
        max: 5,
    }
})


const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true,'Full name is required'], 
        trim:true,
        maxlength:40
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 40
    },
    password:{
        type: String,
        required: [true,'Password must consist atleast 6 characters'],
        trim: true,
        minlength: 6,
        
        
    },
    phoneNumber: {
        type: String,
        required: [true,'Phone number is required'],
        match:[ /^(?:\+91|91|0)?[6-9]\d{9}$/, 'Please enter a valid phone number'],
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    image:{
        type: String,
        trim: true
    },
    role:{
        type:String,
        enum: ['patient', 'doctor',"admin"],
        default: 'patient',
        required:[true, 'Role is required']
    },
    gender:{
        type:String,
        enum: ['male', 'female', 'other'],
        required:[true, 'Gender is required']
    },
    
    patientInfo:{
        type:new mongoose.Schema({
            bloodGroup:{
                type:String,
                enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                required:[function(){
                    return this.parent().role ==='patient'
                }, 'Blood group is required']
            },
            age:{
                type:Number,
                required:[function(){
                    return this.parent().role ==='patient'
                }, 'Age is required'],
                min:[0, 'Age cannot be negative'],
                max:[100, 'Age cannot exceed 100 years']
            },
        }),
    },
    
    doctorInfo:{
        type:new mongoose.Schema({
            specialization: {
                type: String,
                required: [function() {
                    return this.parent().role === 'doctor';
                }, 'Specialization is required'],
                enum: ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Gynecologist', 'Orthopedic', "Dentist"],
            trim: true,
            maxlength: 50
        },
        bio:{
            type:String,
            required:[ function() {
                return this.parent().role === 'doctor';
            }, 'Bio is required'],
        },
        experience: {
            type: Number,
            required:[ function() {
                return this.parent().role === 'doctor';
            }, 'Experience is required'],
            min:[ 0, 'Experience cannot be negative'],
            max: [50, 'Experience cannot exceed 50 years']
        },
        unAvailableDay: {
            type: String,
            required: [function() {
                return this.parent().role === 'doctor';
            }, 'Unavailable Day is required'],

            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            trim: true
        },
        timeSlots:{
             type: new mongoose.Schema({
                startTime: {
                type: String,
                required: [function () {
                    return this.parent().role === 'doctor';
                }, 'Start Time is required'],
                match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'],
                default: '09:00'
                },
                endTime: {
                type: String,
                required: [function () {
                    return this.parent().role === 'doctor';
                }, 'End Time is required'],
                match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'],
                default: '18:00'
                },
            }),
            
        },
        ratings:  [ratingSchema],
        patientCount: {
            type: Number,
            default: 0
        },
     }) },


},{timestamps: true})   


const User = mongoose.model('User', userSchema)

export default User