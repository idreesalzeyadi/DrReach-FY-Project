import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

// API FOR ADDING DOCTOR
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file; // Handle file upload

    // Checking all required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing details in Add Doc" });
    }

    // Validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validating password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Uploading image to Cloudinary (if available)
    let imageUrl = "https://via.placeholder.com/150"; // Default image
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }

    // Preparing doctor data
    const doctorData = {
      name,
      email,
      password: hashedPassword, // Store the hashed password, not the plain one
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // Assuming address is a valid JSON string
      image: imageUrl, // Save the image URL
      date: Date.now(), // Store the current date and time when the doctor is added
    };

    // Saving doctor to the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
  
// API FOR ADMIN LOGIN
 const loginAdmin = async (req , res ) =>{
     
try {
    const {email, password} = req.body
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        
      const token = jwt.sign(email+password,process.env.JWT_SECRET )
      res.json({success: true , token})

    }
    else {
        res.json({ success: false , message: "Email or Password wrong"})
    }
} catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message })
}
 }

// API to Get All Docs
const allDoctors = async (req , res) => {
  try {
    
const doctors = await doctorModel.find({}).select('-password')
res.json({success: true , doctors})

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message })
  }
}
// API to Get All APPOINTMENTS LIST
const appointmentsAdmin = async (req , res) => {
  try {

    const appointments = await appointmentModel.find({})
    res.json({success: true , appointments})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
    
  }
}

// Api for appointment cancellation
const appointmentCancel = async (req , res)=>{

  try {
      
  const { appointmentId} = req.body
  
  const appointmentData = await appointmentModel.findById(appointmentId)
  
  await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
  
  // releasing doc slot
  const { docId , slotDate, slotTime} = appointmentData
  
  const docData = await doctorModel.findById(docId)
  
  let slots_booked = docData.slots_booked
  
  slots_booked[slotDate] = slots_booked[slotDate].filter((e => e !== slotTime))
  
  await doctorModel.findByIdAndUpdate(docId, {slots_booked})
  
  res.json({success: true , message: "Appointment cancelled"})
  
  
  } catch (error) {
      console.log(error);
          res.json({ success: false, message: error.message });
  }
  
     }

// api to get dashboard stats
const adminDashboard = async (req , res) => {

try {
  
const doctors = await doctorModel.find({})
const appointments = await appointmentModel.find({})
const users = await userModel.find({})

const dashData ={

doctors: doctors.length,
appointments: appointments.length,
patients: users.length,
latestAppointments: appointments.reverse().slice(0, 5)
}
res.json({success: true , dashData})


} catch (error) {
  console.log(error);
          res.json({ success: false, message: error.message });
}

}
  

export { addDoctor, loginAdmin, allDoctors , appointmentsAdmin , appointmentCancel , adminDashboard};

