import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "styles/GlobalStyles";

import './App.css'
import UserCard from './components/User/User'

function App() {


  return (<BrowserRouter>
    
    <GlobalStyles/>
    <UserCard/>
    

   </BrowserRouter>
  )
}

export default App
