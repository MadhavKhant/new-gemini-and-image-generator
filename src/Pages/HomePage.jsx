import {Link} from 'react-router-dom'
import homepagebg from '../assets/homepagebg.jpeg'
import dragonImage from '../assets/dragon.png'
import GeminiHomepageImage from '../assets/GeminiHomepageImage.png'
import { useEffect } from 'react'

let GeminiImage = GeminiHomepageImage
let TextToImageImage = dragonImage

const HomePage = () => {

  return (
    <div
      style={{
        backgroundImage: `url(${homepagebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh"

      }}
    >

      <Link to="https://my-portfolio-seven-henna-10.vercel.app/" target='_blank'
        className="font-bold px-4 py-2 rounded-2xl bg-yellow-400 text-black 
            hover:scale-90 transition-all duration-300 hover:bg-gray-700 hover:text-white
            translate-x-[70px] translate-y-2 transform w-fit inline-block
            "
      >
          Personal Porfolio
      </Link>

      <div className="w-fit flex gap-5  translate-y-[200px]">
        {/* Gemini Link */}
        <div className="sine-wave relative">
          <Link
            to="/Gemini"
            style={{
              backgroundImage: `url(${GeminiImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "200px",
              height: "200px"

            }}
            className="font-bold px-4 py-2 bg-green-500 text-yellow-300 shadow-3xl 
              slow-flip rounded-full border-[2px] text-center
              border-green-500
              "
          >
            <span className='text-pink-700'>Try Gemini</span>
          </Link>

          <div 
            className='absolute w-[200px] h-[200px] bg-blue-700 rounded-full inset-0 -z-10 slow-flip2
            bg-gradient-to-r from-yellow-500 from-10% via-sky-500 via-30% to-pink-500 to-90% 
          '>
          </div>
        </div>

        {/* Text to Image Link */}
        <div className="sine-wave relative rounded-full">
          <Link
            to="/TextToImage"
            style={{
              backgroundImage: `url(${TextToImageImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              //  width: "200px",
              //  height: "200px"
            }}
            className="font-bold px-4 py-2 rounded-full text-center w-[200px] h-[200px] bg-green-500 text-yellow-300 shadow-3xl slow-flip"
          >
            <span className='text-black text-[15px]'>Text to Image</span>
          </Link>


          <div 
            className='absolute w-[200px] h-[200px] bg-blue-700 rounded-full inset-0 -z-10 slow-flip2
            
            bg-gradient-to-r from-yellow-500 from-10% via-sky-500 via-30% to-pink-500 to-90% 
          '>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
