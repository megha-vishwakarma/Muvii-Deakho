import React from "react"
import fetchDataFromApi from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigration, getGenres} from "./features/homeSlice"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import Details from "./pages/details/Details"
import SearchResult from "./pages/home/searchResult/SearchResult"
import ErrorSection from "./pages/404/ErrorSection"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Explore from "./pages/explore/Explore.jsx"
import { isAllOf } from "@reduxjs/toolkit"
function App() {

  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
    .then((data) => {
      const url = {
        backdrop: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original"
      }
      dispatch(getApiConfigration(url))
    })
  }

  const genresCall = async () => {
    let promises = []
    let endpoints = ["tv", "movie"]
    let allGenres = []
    endpoints.forEach((endpoint) => {
      const promise = fetchDataFromApi(`/genre/${endpoint}/list`)
      promises.push(promise)
    })

    const data = await Promise.all(promises)

    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item.name))
    })


    dispatch(getGenres(allGenres))

  }

  React.useEffect(() => {

    fetchApiConfig();
    
  }, [])

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/"  element = {<HomePage/>}/>
        <Route path="/:mediaType/:id"  element = {<Details/>}/>
        <Route path = "/search/:query" element = {<SearchResult/>}/>
        <Route path = "*" element = {ErrorSection}/>
        <Route path="/explore/:mediaType" element={<Explore />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
