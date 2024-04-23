//call express(to build serrver)
const express = require("express")
const app = express();
//connect mongo db database
require("./mong/mong");
require("dotenv").config

const auth =  require("./routes/auth");
const list =  require("./routes/list");
app.use(express.json());



app.listen(process.env.PORT, ()=>{
    console.log("server started");
});
//install nodemon to run server(pip install -g nodemon)(nodemon app.js)

//to show on screen that its working
app.use("/api/v1", auth);
app.use("/api/v2", list);
app.get("/", (req,res)=>{
    res.send("Hello")

})

