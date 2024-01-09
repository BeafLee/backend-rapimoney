import { Router } from "express";
import sqlite3 from "sqlite3";

const loginRouter = Router();

//Login only by email
loginRouter.post("/", (req, res) => {
    const { email } = req.body;

    const db = new sqlite3.Database('./rapimoney-db.db');

    db.get(`SELECT * FROM clientes where correo = "${email}"`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.statusCode = 500;
            return res.json({status: false, message: 'Failed to login', data: null});
        } else {
            if (!rows) return res.json({status: false, message: 'invalid user', data: null});
            
            return res.json({status: true, message: `Welcome ${rows.nombres}`, data: null});
        }
      });

    db.close(); 
})


export default loginRouter;