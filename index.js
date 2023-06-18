const express = require("express");
const router = require("./routes/pageRoutes")
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/pages", router);

// app.get("/",(req,res)=>{
//     res.send("This is Home page")
// });

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});