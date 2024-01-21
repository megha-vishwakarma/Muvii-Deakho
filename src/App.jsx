import React from "react"
import fetchDataFromApi from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigration} from "./features/homeSlice"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import Details from "./pages/details/Details"
import SearchResult from "./pages/home/searchResult/SearchResult"
import ErrorSection from "./pages/404/ErrorSection"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
function App() {

  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
    .then((data) => {
      console.log( "data " + data)
      const url = {
        backdrop: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original"
      }
      console.log(data)
      dispatch(getApiConfigration(url))
    })
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
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
