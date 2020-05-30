const Data = require('../Models/Data')
const SendData = {}

SendData.getdata = function(req,res){
    res.send(Data)
}

SendData.setdata = function(req,res){
    let { body } = req
    console.log("Employ Data",body)
    res.status(200).send("success")
}
module.exports = SendData