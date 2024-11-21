import HomePage from "./Pages/HomePage"
import './App.css'
import { Routes, Route } from "react-router-dom";
import GeminiAi from "./Pages/GeminiAi";
import TextToImage from "./Pages/TextToImage";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element = {<HomePage/>}/> 
        <Route path="/Gemini" element = {<GeminiAi/>}/> 
        <Route path="/TextToImage" element = {<TextToImage/>}/> 
      </Routes>      
    </>
  )
}

export default App
