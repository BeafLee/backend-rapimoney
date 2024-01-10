import { Router } from "express";
import sqlite3 from "sqlite3";

const clientRouter = Router();

//Client list endpoint 
clientRouter.get("/", async (req, res) => {
    const db = new sqlite3.Database('./rapimoney-db.db');

    try {
        const rows = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM clientes', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (!rows || rows.length === 0) {
            return res.json({ status: false, message: "There are no clients", data: null });
        }

        return res.json({ status: true, message: "Client list", data: rows });

    } catch (error) {
        console.error(error.message);
        res.statusCode = 500;
        return res.json({ status: false, message: "Error when listing clients", data: null });

    } finally {
        db.close();
    }
});

clientRouter.post("/", (req, res) => {
    const { dni, name, lastname, birthdate, phone, email, bank, cci_num } = req.body;

    if (!dni || !name || !lastname || !birthdate || !phone || !email || !bank || !cci_num) {
        res.statusCode = 400;
        return res.json({ status: false, message: "Missing required fields", data: null });
    }

    const db = new sqlite3.Database('./rapimoney-db.db');

    const sql = "INSERT INTO clientes(dni, nombres, apellidos, fecha_nacimiento, celular, correo, banco, numero_cci) VALUES(?,?,?,?,?,?,?,?)";

    db.run(sql, [dni, name, lastname, birthdate, phone, email, bank, cci_num], function (err) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({ status: false, message: "Error registering client", data: null });
        }

        return res.json({ status: true, message: "Successful client registration", data: null });
    });

    db.close();
});

export default clientRouter;