import { useContext, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";


const GeminiAi = () => {

  const context = useContext(Context);
  let {
    inputValue,
    SetinputValue,
    loading,
    Setloading,
    OutputData,
    SetOutputData,
    onSent,
  } = context;

  const [active, Setactive] = useState(false);

  // useEffect(() => {
  //   console.log("OUTPUT updated: ", OutputData);  // Logs whenever OutputData changes
  // }, [OutputData]);

  useEffect(() => {

    if(OutputData.length === 0)
    {
      Setactive(false);
      return;
    }

    const x = localStorage.getItem("geminiActive");
    if(x === "true")
    {
      Setactive(true);
    }
  },[])

  const Clickhandler = () => {
    if (inputValue.trim() === "") return; 
    Setactive(true);
    localStorage.setItem("geminiActive", "true");
    onSent(inputValue)
  }

  

  let bg = "https://images3.alphacoders.com/279/thumb-1920-279977.jpg"

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh"

      }}

      className="overflow-y-hidden overflow-x-hidden "
    >

      <div className="w-fit flex gap-5 translate-x-2 translate-y-2">
        <Link to="/" 
          className="font-bold px-4 py-2 rounded-2xl bg-black text-green-600 
            hover:scale-90 transition-all duration-300 hover:bg-gray-700 hover:text-white"
        >
          HomePage
        </Link>

        <Link to="/TextToImage"
          className="font-bold px-4 py-2 rounded-2xl  bg-pink-800 text-sky-300
          hover:scale-90 transition-all duration-300 hover:bg-gray-700 hover:text-white"
        >
          Text to Image
        </Link>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Pre:wght@400..700&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Parkinsans:wght@300..800&display=swap" rel="stylesheet"></link>
      <div
        className="mt-10 translate-x-[60px]"
        style={{
          fontFamily: '"Parkinsans", sans-serif',
          fontOpticalSizing: "auto",
          fontWeight: 500,
          fontStyle: "normal",
        }}
      >
        <div className="w-[1000px] h-[400px] mx-auto overflow-y-auto rounded-3xl">
          {
            !loading && 
            <div className="pros overflow-y-auto max-w-[900px] ml-4 mt-2 text-gray-100"
              dangerouslySetInnerHTML={{__html: OutputData}}
            >
            </div> 
          }

          {
            !active && !loading && 
            <div className="bg-gradient-to-r from-pink-600 via-gray-500 to-yellow-400 
              w-fit text-transparent bg-clip-text  text-[70px] mx-auto text-center
              ">
              Hello, put your prompt
            </div>
          }
        </div>

        <div className="flex justify-center items-center w-fit mx-auto mb-5 mt-10">
          <textarea
            value={inputValue}
            onChange={(e) => SetinputValue(e.target.value)}
            placeholder="Enter Your prompt" 
            className=" border-[3px] border-yellow-300 w-[750px] max-h-[100px] min-h-[120px] bg-transparent
              text-black text-lg rounded-3xl px-12 py-2"
          >
          </textarea>
            <button
              onClick={Clickhandler}
              className="bg-yellow-50 right-6 flex justify-center hover:text-yellow-800
               hover:bg-slate-700 hover:scale-90 transition-all duration-300 
              items-center rounded-3xl text-black w-[50px] h-[50px] translate-x-4 translate-y-[-20px]"
            >
              <IoMdSend />
            </button>
        </div>
      </div>
    </div>
  )
}

export default GeminiAi
