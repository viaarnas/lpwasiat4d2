const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/users", (req,res) => {
    const nama = req.body.nama;
    const purpose = req.body.purpose;

    db.query(
        "INSERT INTO users (nama, purpose) VALUES (?, ?)",
        [nama, purpose],
        (err, result) => {
            if (err) return res.json(err);

            res.json({
                message: "Data berhasil disimpan",
                id: result.insertId
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});

