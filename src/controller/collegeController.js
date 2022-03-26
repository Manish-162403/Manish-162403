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

        const upperCaseFullName=data.fullName

        let newStringFullName=convertFirstLetterToUpperCase(upperCaseFullName)
        function convertFirstLetterToUpperCase(upperCaseFullName) {
          var  splitStr= upperCaseFullName.toLowerCase().split(' ');
          for (var i = 0; i < splitStr.length; i++) {
              splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
          }
         
          return splitStr.join(' '); 
        }

      let checkForFullName = await collegeModel.findOne({fullName:data.fullName}) 
      if(checkForFullName){return res.status(400).send({msg:"College already exists."})}

    if((/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink))){    
       
    const savedData = await collegeModel.create(data)

    const collegeDoc = {name:savedData.name, fullName:newStringFullName, logoLink:savedData.logoLink,image:savedData.image, isDeleted : false}

   return res.status(201).send({status: "college Created", collegeDoc})

     }else{return res.status(400).send({msg : "please enter a valid URL"})}
         
    }else{return res.status(400).send({status:false, ERROR: "please enter some data"})}

}catch(err){
   return res.status(500).send({ERROR:err.message})
}}


// get college detalis......................................

const collegeDetails = async function (req, res) {

try{
    const data = req.query.collegeName
if(!data){return res.status(400).send({status:false, ERROR:"college name not found in query"})}

const newData = await collegeModel.findOne({name:data, isDeleted:false})
if(!isValid(newData)){return res.status(400).send({ERROR: "Data provided is not present in college Database"})}



const internData = await internModel.find({collegeId:newData._id, isDeleted:false}).select({name:1,email:1,mobile:1})

const getData = {name:newData.name,fullName:newData.fullName,logoLink:newData.logoLink, InternData: internData.length> 0 ? internData : "no interns found"}

return res.status(200).send({Data:getData})

}catch(err){
 return res.status(500).send({ERROR:err.message})
}}


   
module.exports.collegeDetails = collegeDetails;

module.exports.createCollege = createCollege
