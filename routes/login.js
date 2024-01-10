import { Router } from "express";
import sqlite3 from "sqlite3";

const loginRouter = Router();

//Login only by email
loginRouter.post("/", async (req, res) => {
    const { email, dni } = req.body;

    const db = new sqlite3.Database('./rapimoney-db.db');

    try {       
        const query = 'SELECT * FROM clientes WHERE correo = ? AND dni = ?';

        const user = await new Promise((resolve, reject) => {
            db.get(query, [email, dni], (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });

        if (!user) {
            return res.json({ status: false, message: 'Invalid user', data: null });
        }

        return res.json({ status: true, message: `Welcome ${user.nombres}`, data: null });

    } catch (error) {
        console.error(error.message);
        res.statusCode = 500;
        return res.json({ status: false, message: 'Failed to login', data: null });

    } finally {
        db.close();
    }
});



export default loginRouter;