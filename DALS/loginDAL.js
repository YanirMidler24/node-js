const jfile = require("jsonfile")

exports.checkUserAndPwd = function (obj) 
{
    return new Promise((resolve, reject) => {
        jfile.readFile(__dirname + "/Users.json", function (err, data) 
        {
            if(err)
            {
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


exports.CheckSession = function()
{
    return new Promise((resolve,reject) =>
    {
        jfile.readFile(__dirname + "/sessionDataDAL.json" ,function (err,data)
        {
            if(err)
            {
                return reject(err)
            }else{
               return  resolve(data)
            }
        })
    })
}

exports.UpdateCheckSession = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jfile.writeFile(__dirname + "/sessionDataDAL.json" ,obj,function (err)
        {
            if(err)
            {
                return reject(err)
            }else{
               return  resolve("Session data has been updated!")
            }
        })
    })
}