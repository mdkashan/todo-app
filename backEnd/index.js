const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);


mongoose.connect('mongodb+srv://kashan0503:kashan@cluster0.yogwnyb.mongodb.net/todos', { dbName: "todos" }).then(()=>{
    console.log("db connection sucessfull")
}).catch((err)=>{
    console.log(err)
})

app.listen(port, () => {
    console.log(`app is up and listening at http://localhost:${port}`)
})