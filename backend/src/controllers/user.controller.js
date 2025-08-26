import User from '../models/user.model.js';


export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error in getAllDoctors controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getDoctor = async (req, res) => {
  try {
  
    const doctor = await User.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log("Error in getDoctor controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const submitRating = async (req, res) => {
  // const { doctor} = req.params;
  const { doctor,userId, score } = req.body;
  try {
    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ message: "Score is required" });
    }

    const Doctor = await User.findById(doctor);
    if (!Doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!Doctor.doctorInfo) {
      Doctor.doctorInfo = { ratings: [] };
    } else if (!Doctor.doctorInfo.ratings) {
      Doctor.doctorInfo.ratings = [];
    }
    // const existingRating = Doctor.doctorInfo.ratings.find(r => r.userId.toString() === userId);
    
    Doctor.doctorInfo.ratings.push({ userId, score });
    
    await Doctor.save();

    res.status(200).json({ message: "Rating submitted successfully", Doctor });
  } catch (error) {
    console.log("Error in submitRating controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async(req,res)=>{
  try {
    const {image} = req.body;
    const userId = req.user._id

    if (!image){
      return res.status(500).json({message:"Internal server error"})
    }

    const upLoadingImage = await cloudinary.uploader.upload(image)
    const updatedUser = await User.findByIdAndUpdate(userId,{image:upLoadingImage.secure_url},{new:true})
    res.status(200).json(updatedUser)
    console.log(updatedUser)
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}