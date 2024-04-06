const mongoose = require("mongoose");
require("dotenv").config();

async function DBconn() {
    mongoose
        .connect(process.env.DB_URL)
        .then(() => {
            console.log("Connection Successful");
        })
        .catch((err) => {
            console.log(err);
        });
}
try {
    DBconn();
} catch (err) {
    console.log(err);
}