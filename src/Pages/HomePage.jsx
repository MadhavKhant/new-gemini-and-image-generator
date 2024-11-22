import {Link} from 'react-router-dom'
import homepagebg from '../assets/homepagebg.jpeg'

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
      <div className="w-fit flex gap-5 mx-auto translate-y-2">
        <Link to="/Gemini" 
          className="font-bold px-4 py-2 rounded-2xl bg-green-500 text-yellow-300"
        >
          Gemini
        </Link>

        <Link to="/TextToImage"
          className="font-bold px-4 py-2 rounded-2xl bg-green-500 text-yellow-300"
        >
          Text to Image
        </Link>
      </div>
    </div>
  )
}

export default HomePage
