const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

// validation........................................................

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

// create intern....................................................

const createIntern = async function (req, res) {

try{
    const data =req.body

if (Object.keys(data).length === 0) { return res.status(400).send("Bad Request")}

if (!isValid(data.name)) {
                  return res.status(400).send({ status: false, msg: "name is required" });
             }

if (!isValid(data.email)) {
                return res.status(400).send({ status: false, msg: "email is required" });
           }
if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {return res.status(400).send({ status: false, msg: "Please provide a valid email" });}

if (!isValid(data.mobile)) {
            return res.status(400).send({ status: false, msg: "mobile is required" })
       }

if (!/^([+]\d{2})?\d{10}$/.test(data.mobile)) {return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" });}

if (!isValid(data.collegeId)) {
        return res.status(400).send({ status: false, msg: "email is required" });
   }

   if(!data.collegeId){return res.send("college is not present in database")}

   let dupli = await internModel.findOne({ email: data.email });

            if (dupli) {return res.status(400).send({ status: false, msg: "Email already exists" });
            }

    let duplimob = await internModel.findOne({ mobile: data.mobile });

            if (duplimob) {return res.status(400).send({ status: false, msg: "mobile nmuber already exists" });
            }
   
//    const savedData = await collegeModel.findOne({name:data.collegeId})

//    if(!savedData){return res.send("college is not present in database")}
 
//    const id = savedData._id

//    if(!id){return res.send("College Id not Found")}

// const newData = {name:data.name,email:data.email,mobile:data.mobile,collegeId:id}

const output = await internModel.create(data)

const createInternData = {isdeleted:false, name:output.name, email:output.email, mobile:output.mobile, collegeId: output.collegeId}

return res.status(201).send({status:true, internData:createInternData})



}catch(err){return res.status(500).send({ERROR: err.message})
}}


module.exports.createIntern = createIntern;
