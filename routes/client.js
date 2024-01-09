import { Router } from "express";
import sqlite3 from "sqlite3";

const clientRouter = Router();

clientRouter.get("/", (req, res) => {
    const db = new sqlite3.Database('./rapimoney-db.db');

    db.all('select * from clientes where id = 3', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.statusCode = 500;
            return res.json({status: false, message: "Error when listing clients", data: null});

        } else {
            if (!rows) return res.json({status: false, message: "There are no clients", data: null});

            return res.json({status: true, message: `Client list`, data: rows});
        }
      });

    // Cierra la conexión de la base de datos cuando hayas terminado
    db.close(); 
});



export default clientRouter;