import { db } from "../connection/db.js"

export const getAllUsers = async(req,res) =>{
    try {
        const query = "SELECT * FROM `users`"
        const [rows]= await db.query(query);
        res.status(200).json({success:true,message:"fetched users successfully.",data:rows});            
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
};

