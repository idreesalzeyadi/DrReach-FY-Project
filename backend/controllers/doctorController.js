import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";



const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "availability changed" })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}
const doctorList = async (req, res) => {

    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}
// Api  for doc login
const loginDoctor = async (req , res ) =>{
    
try {
     const { email, password} = req.body
     const doctor = await doctorModel.findOne({email})

     if (!doctor) {
        return res.json({ success: false, message: "user not exists"})
     }

const isMatch = await bcrypt.compare(password, doctor.password)

if (isMatch) {
 const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

 res.json({ success: true, token })
} else {
    res.json({ success: false, message: "wrong password" })
}

} catch (error) {
    console.error(error);
        res.json({ success: false, message: error.message })
}

}

// API to get all appointments for doc panel
const appointmentsDoctor = async (req , res) => {
    
try {
    
const {docId} = req.body
const appointments = await appointmentModel.find({docId})

res.json({success: true , appointments})

} catch (error) {
    
    console.error(error);
        res.json({ success: false, message: error.message })
}

}

// api to mark appointment as completed

const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId, docId } = req.body;

        // Validate inputs
        if (!appointmentId || !docId) {
            return res.json({ success: false, message: "Appointment ID and Doctor ID are required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Ensure the appointment belongs to the doctor
        if (appointmentData.docId.toString() !== docId) {
            return res.json({ success: false, message: "Appointment does not belong to the current doctor" });
        }

        // Check if the appointment is already canceled
        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Cannot complete a canceled appointment" });
        }

        // Mark the appointment as completed
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
        res.json({ success: true, message: "Appointment marked as completed" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId, docId } = req.body;

        // Validate inputs
        if (!appointmentId || !docId) {
            return res.json({ success: false, message: "Appointment ID and Doctor ID are required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Ensure the appointment belongs to the doctor
        if (appointmentData.docId.toString() !== docId) {
            return res.json({ success: false, message: "Appointment does not belong to the current doctor" });
        }

        // Check if the appointment is already completed
        if (appointmentData.isCompleted) {
            return res.json({ success: false, message: "Cannot cancel a completed appointment" });
        }

        // Mark the appointment as canceled
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        res.json({ success: true, message: "Appointment marked as canceled" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
// API to get all dashboard stats
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });

        let patients = [];
        appointments.forEach((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


// API to doctor profile for doc panel
const  doctorProfile = async (req , res) =>{
    try {
        const {docId} = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success: true , profileData})


    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//API to Update doc profile
const updateDoctorProfile = async (req , res)=>{
    try {
        const {docId,  phone, address, fees,  available}= req.body


        await doctorModel.findByIdAndUpdate(docId, {phone, address, fees, available})

        res.json({success: true , message: "profile updated"})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}


export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, 
    doctorProfile, updateDoctorProfile,appointmentComplete, appointmentCancel , doctorDashboard}
