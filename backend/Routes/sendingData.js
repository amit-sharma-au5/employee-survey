const express = require('express');
const router = express.Router()
const sendindDataController = require('../Controllers/SendData')


router.get("/getdata",(req,res)=>{
    sendindDataController.getdata(req,res);
})

router.post("/setdata",(req,res) =>{
    sendindDataController.setdata(req,res);
})

module.exports = router