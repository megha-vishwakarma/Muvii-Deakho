import axios from "axios";

const baseURL = "https://api.themoviedb.org/3"

const token = import.meta.env.VITE_APP_TMDB_TOKEN
const header = {
    Authorization: `Bearer ${token}`
}

const fetchDataFromApi = async (url, params) => {
    try {

        const data = await axios.get(baseURL + url, {
            headers: header,
            params: params
        })

        return data.data

    } catch (error) {
        console.log(error)
        return error
    }

}

export default fetchDataFromApi