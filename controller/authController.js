import { db } from "../connection/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ success: false, message: "email and password are required." });
        }
        const query = "SELECT * FROM users WHERE email = ?";
        const [queryRes] = await db.query(query, [email]);

        const user = queryRes[0];

        if (queryRes.length == 0) {
            return res.status(404).json({ success: false, message: "User not exist please check your email." });
        }

        const isHashed = user.password.startsWith("$2");
        let isPasswordValid = false;

        if (isHashed) {
            // 🔐 Compare using bcrypt
            isPasswordValid = await bcrypt.compare(password, user.password);
        } else {
            // 🧾 Plain-text comparison
            isPasswordValid = (password === user.password);
        }

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        delete user.password;
        return res.status(200).json({ success: true, message: "User login successfuly ", token, user: user });

    } catch (error) {
        console.error("Error in loginHandler:", error.message);
        return res.status(500).json({ success: false, message: error.message })
    }

}

export const registerHandler = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;
        //validation
        if (!full_name || !email || !password) {
            return res.status(401).json({ success: false, message: "please all required fields" })
        }

        //check_user_alread_exist_or_not_based_on_email
        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existing.length > 0) {
            return res.status(401).json({ success: false, message: "User already exists. Please login instead." });
        }
        //if_not_exist_so_created_bcrypt.hash(password,10)
        const registerQuery = "INSERT INTO users (full_name, email, password) VALUES(?,?,?)";
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(registerQuery, [full_name, email, hashedPassword]);

        if (result.insertId) {
            return res.status(200).json({
                success: true, message: "User register successfuly.",
                user_id: result.insertId,
            });
        }

    } catch (error) {
        console.log("Error in registerHandler>", error.message);
        return res.status(500).json({ success: false, message: "Something went wront during register", error: error.message });
    }

}