import { Router } from "express";
import sqlite3 from "sqlite3";

const clientRouter = Router();

//Client list endpoint 
clientRouter.get("/", (req, res) => {
    const db = new sqlite3.Database('./rapimoney-db.db');

    db.all('select * from clientes', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.statusCode = 500;
            return res.json({status: false, message: "Error when listing clients", data: null});

        } else {
            if (!rows) return res.json({status: false, message: "There are no clients", data: null});

            return res.json({status: true, message: `Client list`, data: rows});
        }
      });

    db.close(); 
});

clientRouter.post("/", (req, res) => {
    const { dni, name, lastname, birthdate, phone, email, bank, cci_num } = req.body
 
    const db = new sqlite3.Database('./rapimoney-db.db');

    const sql = "insert into clientes(dni, nombres, apellidos, fecha_nacimiento, celular, correo, banco, numero_cci) values(?,?,?,?,?,?,?,?)";

    db.run(sql, [dni, name, lastname, birthdate, phone, email, bank, cci_num ], 
        (err) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                return res.json({status: false, message: "Error registing client", data: null});    
            } 
            
            return res.json({status: true, message: `Successfull client registration`, data: null});

        }
    );

    db.close(); 
});

export default clientRouter;