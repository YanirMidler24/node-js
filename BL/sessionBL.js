const session = require("express-session")
const sessionDAL = require("../DALS/loginDAL")


const checkSessionData = async function() 
{
    try{
        let resp = await sessionDAL.CheckSession()
        return resp
    }catch(err)
    {
        console.log(err)
    }
}



const updatedSessionData = async function(obj) 
{
    try{
        let resp = await sessionDAL.UpdateCheckSession(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}

module.exports = {checkSessionData,updatedSessionData}