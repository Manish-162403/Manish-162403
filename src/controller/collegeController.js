const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// create college................................................

const createCollege = async function (req,res){
    
try{    
    const data = req.body;

    if (Object.keys(data).length > 0) {

    if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }

     let checkForClg = await collegeModel.findOne({name:data.name})
     if(checkForClg){return res.status(400).send({msg:"College already exists."})}

        if(!isValid(data.fullName)){return res.status(400).send({status:false , msg:"Full Name is required"})}

      let checkForFullName = await collegeModel.findOne({fullName:data.fullName})
      if(checkForFullName){return res.status(400).send({msg:"College already exists."})}

        if((/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink))){    
       
    const savedData = await collegeModel.create(data)

    const collegeDoc = {name:savedData.name, fullName:savedData.fullName, logoLink:savedData.logoLink, isDeleted : false}

   return res.status(201).send({status: "college Created", collegeDoc})

     }else{return res.status(400).send({msg : "please enter a valid URL"})}
         
    }else{return res.status(400).send({msg: "please enter some data"})}

}catch(err){
   return res.status(500).send({ERROR:err.message})
}}


// get college detalis......................................

const collegeDetails = async function (req, res) {

try{
    const data = req.query.collegeName
if(!data){return res.status(400).send("college name not found")}

const newData = await collegeModel.findOne({collegeId:data._id, isDeleted:false})
if(newData.length==0){return res.status(400).send({ERROR: "Data provided is not present in college Database"})}

const internData = await internModel.find({id:data._id, isDeleted:false}).select({name:1,email:1,moblie:1})
if(internData.length==0){return res.status(400).send({ERROR: "No intern applied til now"})}

const getData = {name:newData.name,fullName:newData.fullName,logoLink:newData.logoLink,internData}

return res.status(200).send({Data:getData})

}catch(err){
 return res.status(500).send({ERROR:err.message})
}}



   
module.exports.collegeDetails = collegeDetails;

module.exports.createCollege = createCollege



  //   try {
  //     let collegeName = req.query.collegeName
  //     if (!collegeName) { return res.status(400).send({ status: false, ERROR: "Please provide college Name in query" }) }

  //     let resCollege = await collegeModel.findOne({ name: collegeName })
  //     if (!resCollege) { return res.status(404).send({ status: false, Error: "no college found" }) }
  
  //     let presentInterns = await internModel.find({ collegeId: resCollege._id, isDeleted:false })
  //     let result = { name: resCollege.name, fullName: resCollege.fullName, logoLink: resCollege.logoLink }

  //     if (presentInterns.length > 0) {
  //       result["Interest"] = presentInterns
  
  //       return res.status(200).send({ data: result })
  //     }
  
  //     if (presentInterns.length == 0) {
  //       result["Interest"] = "no interns for now";
  //       return res.status(200).send({ data: result })
  //     }
  
  
  //   } catch (err) {
  //     return res.status(500).send({ ERROR: err.message })
  //   }
  
  // }

 //const newVariable = {id: internData._id,name:internData.name,email:internData.email,mobile:internData.mobile}

// const [...abs] = newVariable
//const finalData = {Data:getData, insert:newVariable}

// console.log([abs])
