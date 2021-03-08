const moviesDAL = require("../DALS/moviesDAL")
const axios = require("axios")



const getMoviesFromAPIBL = async function (name) {
    try {
        let result = await moviesDAL.getMoviesDetails()
        let resp = await moviesDAL.getMoviesFromAPI()
        let movie = []
        result.forEach(x => {
            if (x.name == name) {
                movie.push(x)
                if (movie.empty) {
                    let m = resp.data.filter(x => x.name == name)
                    movie = m
                }
            }
        })

        return movie
    } catch (err) {
        console.log(err)
    }
}


const getMoviesBL = async function () {
    try {
        let res = await moviesDAL.getMovies()
        return res
    } catch (err) {
        return (err)
    }
}

const setNewMovies = async function (obj) {
    try {
        let resp = await moviesDAL.getMoviesDetails()
        let arr
        arr = [...resp]
        obj.id = arr.length + 1
        arr.push(obj)
        let res = await moviesDAL.updateMovie(arr)
        return res
    } catch (err) {
        return (err)
    }
}

const getmovieData = async function () {
    try {

        let json = {}
        let resp = await moviesDAL.getMoviesDetails()
        let allgeneres = resp.map(x => x.genres)
        let alllanguage = resp.map(x => x.language)
        let arr = []
        let GenArr = [""]
        allgeneres.map(x => {
            if (x == undefined) {
                return null
            } else if (x != undefined) {
                arr.push(x)
            }
        })
        arr.map(x => {
            x.map(y => {
                if (!GenArr.includes(y)) {
                    GenArr.push(y)
                }
            })
        })
        let lengArr = [""]
        alllanguage.forEach(x => {
            if (!lengArr.includes(x)) {
                lengArr.push(x)
            }
            return x
        })
        json.onlyfilterLengauge = lengArr
        json.onlyfilterGeneres = GenArr
        return json
    }
    catch (err) {
        console.log(err)
    }

}

const getmovieDataFromSearch = async function (SearchMovieObj) {

    try {
        let resp = await moviesDAL.getMoviesFromAPI()
        let movie = []

        resp.data.forEach(x => {
            if (x.name == undefined || x.genres == undefined || x.language == undefined) {

                return null
            }
            else {
                if (x.name.includes(SearchMovieObj.movieTitle)) {
                    movie.push(x)
                } else if (SearchMovieObj.movieTitle == "") {
                    if (x.genres.includes(SearchMovieObj.movieGenre) || x.language.includes(SearchMovieObj.movieLanguage)) {
                        movie.push(x)
                    }
                }
            }
        })
        return movie




    } catch (err) {
        console.log(err)
    }

}

const getAnotherMovies = async function (obj) {
    try {
        let resp = await moviesDAL.getMoviesDetails()
        let movie = []
        let mfs = await moviesDAL.ReadSaveMovieInSession()
        resp.forEach(x => {
            if (x.genres == undefined) {
                return null
            } else {
                
                if (x.genres.includes(mfs.movieGenre) || x.language == mfs.movieLanguage || x.name.includes(mfs.movieTitle)) {
                    movie.push(x)

                } 
            }
        })
        return movie
    } catch (err) {
        console.log(err)
    }
}

const SaveMovieSessionBL = async function (obj) {
    try {
        let arr = []
        arr.push(obj)
        let resp = await moviesDAL.SaveMovieInSession(arr)
        return resp
    } catch (err) {
        console.log(err)
    }
}

const ReadMovieSessionBL = async function () {
    try {
        let resp = await moviesDAL.ReadSaveMovieInSession()
        return resp
    } catch (err) {
        console.log(err)
    }
}




module.exports = { getMoviesBL, setNewMovies, getmovieData, getmovieDataFromSearch, getAnotherMovies, getMoviesFromAPIBL, SaveMovieSessionBL ,ReadMovieSessionBL}