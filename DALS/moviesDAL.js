const axios = require("axios")
const jfile = require("jsonfile")




exports.getMoviesFromAPI = () => {
    return axios.get("https://api.tvmaze.com/shows")
}


exports.getMovies = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://api.tvmaze.com/shows").then(resp => {
            jfile.readFile(__dirname + "/NewMovies.json", function (err, data) {
                try {
                    if (!data) {
                        jfile.writeFile(__dirname + "/NewMovies.json", resp.data, function (err) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve("movie has been updated!")
                            }
                        })
                    }
                } catch (err) {
                    reject(err)
                }
            })
        })
    })
}

exports.updateMovie = (obj) => {
    return new Promise((resolve, reject) => {
        jfile.writeFile(__dirname + "/NewMovies.json", obj, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}


exports.getMoviesDetails = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(__dirname + "/NewMovies.json", function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.SaveMovieInSession = function(data)
{
    return new Promise((resolve,reject) =>
    {
        jfile.writeFile(__dirname + "/MovieSess.json" ,data,function(err)
        {
            if(err)
            {
                reject(err)
            }else{
                resolve("movie has been save")
            }
        })
    })
}

exports.ReadSaveMovieInSession = function()
{
    return new Promise((resolve,reject) =>
    {
        jfile.readFile(__dirname + "/MovieSess.json" ,function(err,data)
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