import { db } from "../connection/db.js";

export const addMoviesHandler = async (req, res) => {
    try {
        const { title, type, director, budget, location, duration, year_or_time, description, image_url, user_id } = req.body;

        if (!title || !user_id || !type) {
            return res.status(400).json({ success: false, message: "user_id, title and type are required." });
        }

        const insertQuery = "INSERT INTO `entries`(`user_id`, `title`, `type`, `director`, `budget`, `location`, `duration`, `year_or_time`, `description`, `image_url`) VALUES (?,?,?,?,?,?,?,?,?,?)"

        const values = [user_id, title, type, director, budget, location, duration, year_or_time, description, image_url]

        const [insertResult] = await db.query(insertQuery, values);

        return res.status(200).json({ success: true, message: "Movies & shows added successfuly.", id: insertResult.id })




    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server Error!", error: error.message })
    }
}

export const getAllMoviesHandler = async (req, res) => {
    try {
        const { user_id } = req.body;

        const query = "SELECT * FROM entries WHERE user_id = ?";

        const [rows] = await db.query(query, [user_id]);

        return res.status(200).json({ success: true, message: "Movies & shows fetched successfuly.", data: rows });


    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

export const editMovieHandler = async (req, res) => {
    try {
        const { id, user_id,
            title,
            type,
            director,
            budget,
            location,
            duration,
            year_or_time,
            description,
            image_url
        } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Id is required." });
        }
        const updateQuery = "UPDATE `entries` SET `title`=?,`type`=?,`director`=?,`budget`=?,`location`=?,`duration`=?,`year_or_time`=?,`description`=?,`image_url`=? WHERE id = ?";
        const values = [title, type, director, budget, location, duration, year_or_time, description, image_url, id]
        const [queryResult] = await db.query(updateQuery, values);

        if (queryResult.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Movie not found or no changes made."
            });
        }

        return res.status(200).json({ success: true, message: "Updated successfuly.", queryResult });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}


export const deletehandler = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Id is required." })
        }

        const deleteQuery = "DELETE FROM entries WHERE id=?";

        const [rows] = await db.query(deleteQuery, [id]);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "No entry found with the given id." });
        }

        res.status(200).json({ success: true, message: "Deleted successfuly." })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message })
    }
} 