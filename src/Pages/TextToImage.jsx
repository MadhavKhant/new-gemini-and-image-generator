import {  useState } from "react";
import loadingGif from '../assets/loadingGif.gif'
// import AiImage from '../assets/AiImage.jpg'
import { Link } from "react-router-dom";
import ironmanImage from '../assets/smallironman.jpg'
import minionImage from '../assets/minions.jpg'



const TextToImage = () => {

    const token = import.meta.env.VITE_TOKEN;
    const [InputText, SetInputText] = useState("");
    const [ImageData2, SetImageData2] = useState(null);
    const [ImageData3, SetImageData3] = useState(null);
    const [loading2, Setloading2] = useState(false);
    const [loading3, Setloading3] = useState(false);
    const [resultLoading2, SetresultLoading2] = useState(false);
    const [resultLoading3, SetresultLoading3] = useState(false);
    const [StartingImageSet, SetStartingImage] = useState(true);

    async function query2() {
      const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers",
          {
              headers: { Authorization: `Bearer ${token}` },
              method: "POST",
              body: JSON.stringify({"inputs": InputText}),
          }
      );
      const result = await response.blob();
      return result;
    }
    
    async function query3() {
      const response = await fetch(
          // "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
              headers: { Authorization: `Bearer ${token}` },
              method: "POST",
              body: JSON.stringify({"inputs": InputText}),
          }
      );
      const result = await response.blob();
      return result;
    }

    const Clickhandler = async () => {

        SetStartingImage(false);

        SetresultLoading2(false);
        SetresultLoading3(false);
        Setloading2(true);
        Setloading3(true);
        SetImageData2(loadingGif);
        SetImageData3(loadingGif);

        try{
            const response2 = await query2();
            let x = URL.createObjectURL(response2)
            SetImageData2(x);
            Setloading2(false);
            SetresultLoading2(true);

            const response3 = await query3();
            let y = URL.createObjectURL(response3);
            SetImageData3(y);
            Setloading3(false);
            SetresultLoading3(true);
        }
        catch(e){
            console.error("Error fetching images:", e);

            Setloading2(false);
            Setloading3(false);
            SetresultLoading2(false);
            SetresultLoading3(false);
        }
    }
    
    const handleChange = (e) => {
      SetInputText(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    }

    //let bg = "https://assets.gatesnotes.com/8a5ac0b3-6095-00af-c50a-89056fbe4642/e675f5c2-624b-4efd-b82f-99e8a6ed968b/AI_20230215_new%20module_1200x580.jpg"
    //let bg = "https://cdn.impossibleimages.ai/wp-content/uploads/2023/04/25130031/AI-Background-Image-Generator-How-It-Works-and-Why-You-Need-It.jpg"
    let bg = minionImage
    let bg2 = ironmanImage
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', // Ensures the image covers the entire div
        backgroundPosition: 'center', // Centers the image in the div
        minWidth: '100%',
        minHeight: '100vh',
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Pre:wght@400..700&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Pre:wght@400..700&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
      
      <div
        style={{
          fontFamily: '"Host Grotesk", sans-serif',
        }} 
        className="w-fit flex gap-5  translate-y-2 ml-2">
        <Link to="/" 
          className="font-bold px-4 py-2 rounded-2xl bg-black text-green-600 
            hover:scale-90 transition-all duration-300 hover:bg-gray-700 hover:text-white"
        >
          HomePage
        </Link>

        <Link to="/Gemini"
          className="font-bold px-4 py-2 rounded-2xl  bg-yellow-700 text-sky-300
          hover:scale-90 transition-all duration-300 hover:bg-gray-700 hover:text-white"
        >
          Try Gemini
        </Link>
      </div>
      
      <div 
        className='flex gap-4 flex-col h-fit w-fit mx-auto'
        style={{
          fontFamily: '"Host Grotesk", sans-serif',
        }}
      >
        <div className=" mx-auto mt-2 rounded-3xl bg-gray-900">

          {
            StartingImageSet && 
            <img src={bg2} className="rounded-2xl h-[400px] w-[500px] border-[3px] border-violet-800"/>
          }

          {
            (loading2 || loading3 || resultLoading2 || resultLoading3) &&  
            <div className="flex gap-7  px-8 py-7">
                <img src={ImageData2} alt='ImageData' 
                  className="rounded-2xl h-[400px] w-[500px]
                    border-yellow-400 border-[4px]

                  "
                />
                <img src={ImageData3} alt='ImageData' className="rounded-2xl h-[400px] w-[500px] border-yellow-400 border-[4px]"/>
            </div>
          }
          
        </div>

        <div className='w-[800px] mx-auto mt-2'>
            <textarea
              style={{ height: "auto" }} // Inline style for dynamic height
                onChange={handleChange}
                value={InputText}
                placeholder='Input your prompt to generate image'
                className='w-full min-h-[40px] max-h-[100px] overflow-y-auto resize-none px-7 py-2
                  border-black border-[1.5px] rounded-3xl bg-gray-600 text-pink-200 
                '
            />
        </div>

        <div
          onClick={Clickhandler}
          className='px-8 py-2 rounded-2xl bg-black text-yellow-500 transition-all duration-300
          font-bold hover:bg-gray-300 hover:scale-95 text-[29px] hover:text-black
          mx-auto hover:cursor-pointer w-fit h-fit border-2 border-green-400
          '
        >
          Generate Image
        </div>

      </div>
    </div>
  )
}

export default TextToImage
