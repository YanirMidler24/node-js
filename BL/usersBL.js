const usersDAL = require("../DALS/userDAL")

const GetUsersList = async function() 
{
  try{
      let resp = await usersDAL.readUserFile()
      return resp
  } catch(err){
      console.log(err)
  }
}


const addnewUser =async function(obj)
{
    try{
        let resp  = await usersDAL.WriteNewUsersFile(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}

const deleteUser =async function(obj)
{
    try{
        let resp  = await usersDAL.WriteNewUsersFile(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}

const updateUser =async function(obj)
{
    try{
        let resp  = await usersDAL.WriteNewUsersFile(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}
module.exports = {GetUsersList,addnewUser,deleteUser,updateUser}