import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from '../lib/cloudinary.js'
import { generateToken } from "../lib/utils.js";
import { startSession } from "mongoose";


// Register a new user
export const signup = async (req, res) => {

   try {
    // Parse nested JSON fields from FormData
    if (req.body.patientInfo) {
      try {
        req.body.patientInfo = JSON.parse(req.body.patientInfo);
      } catch {
        return res.status(400).json({ message: "Invalid patientInfo format" });
      }
    }
    if (req.body.doctorInfo) {
      try {
        req.body.doctorInfo = JSON.parse(req.body.doctorInfo);
      } catch {
        return res.status(400).json({ message: "Invalid doctorInfo format" });
      }
    }}
  catch(error){
      console.log(error.message)
  }

  const { fullName, email,phoneNumber,gender,image,patientInfo,doctorInfo, password, role,bio } = req.body;
  try {
    if (!fullName || !email || !password || !phoneNumber || !gender || !role) {
        if (role === 'patient' && (!patientInfo || !patientInfo.bloodGroup || !patientInfo.age)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (role === 'doctor' && (!doctorInfo || !doctorInfo.specialization || !doctorInfo.experience ||!doctorInfo.timeSlots || !doctorInfo.timeSlots.startTime || !doctorInfo.timeSlots.endTime || !doctorInfo.unAvailableDay || !doctorInfo.bio)) {
            return res.status(400).json({ message: "All fields are required" });
        }
      
    }

    // Check if user already exists

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    let imageUrl;
    if(req.file){
      const uploadResult = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream(
          {resource_type:"image",folder:'user_profiles'},
          (error,result) =>{
            if (error) reject(error)
            else resolve(result)
          }
        ).end(req.file.buffer)
      })
      imageUrl = uploadResult.secure_url
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    // User is a mongoose model that is used to create a new user


    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      image:imageUrl,
      gender,
      phoneNumber,  
      patientInfo: role === 'patient' ? patientInfo : undefined,  
      doctorInfo: role === 'doctor' ? doctorInfo : undefined,  
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        role: newUser.role,
        image:newUser.image,
        phoneNumber :newUser.phoneNumber,
        gender:newUser.gender,
        patientInfo:{
            bloodGroup:newUser.bloodGroup,
            age:newUser.age
        },
        doctorInfo:{    
            specialization:newUser.specialization,
            experience:newUser.experience,
            timeSlots:{
              startTime:newUser.startTime,
              endTime:newUser.endTime,
            },
            unAvailableDay:newUser.unAvailableDay
        }
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login a user 

export const login = async (req, res) => {
  const { email, password} = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email" });

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // generate jwt token here
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
        image:user.image,
        phoneNumber :user.phoneNumber,
        gender:user.gender,
        patientInfo:{
            bloodGroup:user.bloodGroup,
            age:user.age
        },
        doctorInfo:{    
            specialization:user.specialization,
            experience:user.experience,
            timeSlots:{
              startTime:user.startTime,
              endTime:user.endTime,
            },ratings:user.ratings,
            unAvailableDay:user.unAvailableDay
        }
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export const logout = async (req, res) => {
  try {
    res.clearCookie("jwtToken",{ httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: "/"});
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
