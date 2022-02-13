const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const crypt = require("bcrypt");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db"
});

db.connect((err)=>{
    if(err)
    {
        throw err;
    }
    else{
        console.log("Connected");
    }
})

app.use(cors({origin:"*"}));
app.use(express.json());

app.post("/",(req,res) =>{
    const salt = crypt.genSaltSync();
    const hash_password= crypt.hashSync(req.body.password,salt);
    db.query(`INSERT INTO users (user_name,user_pasw) VALUES ("${req.body.name}","${hash_password}")`,(err)=>{
        if(err)
        {
            res.json({status:"db"});
        }
        else{
            res.json({status:"np"});
        }
        
    })
});
app.post("/login",(req,res)=>{
    db.query(`SELECT * FROM users WHERE user_name="${req.body.name}"`,(err,result)=>{
        if(err)
        {
            res.json({login:"err"});
        }
        else if (result.length==0)
        {
            res.json({login:"kb"});
        }
        else{
            if(crypt.compareSync(req.body.password,result[0].user_pasw))
            {
                res.json({login:"gy"});
            }
            else{
                res.json({login:"hs"});
            }
        }
    })
});

app.listen(8080);