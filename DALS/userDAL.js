const jfile = require("jsonfile")


exports.readUserFile = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(__dirname + "/Users.json", function (err, data) {
            if (err) {
                return reject(err)
            } else {
                return resolve(data)
            }
        })
    })
}

exports.WriteNewUsersFile = function (obj) {
    return new Promise((resolve, reject) => {

        jfile.writeFile(__dirname + "/Users.json", obj, function (err) {
            if (err) {
                return reject(err)
            } else {
                resolve("user added !")
            }
        })


    })
}