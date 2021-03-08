const { response } = require("express")
const loginDal = require("../DALS/loginDAL")

const loginUser = async function (obj) {
    try {
        let res = await loginDal.checkUserAndPwd(obj)
        let flag = false
        res.users.forEach(x =>
            {
                if(x.username == obj.username && x.password == obj.password)
                {
                    flag = true
                }
            })
        return flag
    } catch (err) {
        return (err)
    }
}
module.exports = { loginUser }