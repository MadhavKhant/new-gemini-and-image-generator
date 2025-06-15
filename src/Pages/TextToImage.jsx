import { useState } from "react";
import loadingGif from "../assets/loadingGif.gif";
import { Link } from "react-router-dom";
import ironmanImage from "../assets/smallironman.jpg";
import minionImage from "../assets/minions.jpg";

const TextToImage = () => {
  const [InputText, SetInputText] = useState("");
  const [ImageData2, SetImageData2] = useState(null);
  const [ImageData3, SetImageData3] = useState(null);
  const [loading2, Setloading2] = useState(false);
  const [loading3, Setloading3] = useState(false);
  const [resultLoading2, SetresultLoading2] = useState(false);
  const [resultLoading3, SetresultLoading3] = useState(false);
  const [StartingImageSet, SetStartingImage] = useState(true);

  const BackendURL = import.meta.VITE_BACKEND_URL;

  const childClickhandler = async () => {
    SetStartingImage(false);
    SetresultLoading2(false);
    SetresultLoading3(false);
    Setloading2(true);
    Setloading3(true);
    SetImageData2(loadingGif);
    SetImageData3(loadingGif);

    try {
      const response1 = await fetch(BackendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: InputText }),
      });

      const data1 = await response1.json();
      console.log("Image Data:", data1);

      if (!data1.imageUrl) throw new Error("No image returned");
      SetImageData2(data1.imageUrl);
      Setloading2(false);
      SetresultLoading2(true);

      const response2 = await fetch(BackendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: InputText }),
      });
      const data2 = await response2.json();
      console.log("Image Data:", data2);

      if (!data2.imageUrl) throw new Error("No image returned");
      SetImageData3(data2.imageUrl);

      Setloading3(false);
      SetresultLoading3(true);

    } catch (e) {
      console.error("Error fetching images:", e);

      Setloading2(false);
      Setloading3(false);
      SetresultLoading2(false);
      SetresultLoading3(false);
    }
  };

  const Clickhandler = () => {
    childClickhandler();
  };

  const handleChange = (e) => {
    SetInputText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  let bg = minionImage;
  let bg2 = ironmanImage;
  
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover", // Ensures the image covers the entire div
        backgroundPosition: "center", // Centers the image in the div
        minWidth: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          fontFamily: '"Host Grotesk", sans-serif',
        }}
        className="w-fit flex gap-5  translate-y-2 ml-2"
      >
        <Link
          to="/"
          className="font-bold px-4 py-2 rounded-2xl bg-black text-green-600 
            hover:scale-90 transition-all duration-300 hover:bg-gray-700 hover:text-white"
        >
          HomePage
        </Link>

        <Link
          to="/Gemini"
          className="font-bold px-4 py-2 rounded-2xl  bg-yellow-700 text-sky-300
          hover:scale-90 transition-all duration-300 hover:bg-gray-700 hover:text-white"
        >
          Try Gemini
        </Link>
      </div>

      <div
        className="flex gap-4 flex-col h-fit w-fit mx-auto"
        style={{
          fontFamily: '"Host Grotesk", sans-serif',
        }}
      >
        <div className=" mx-auto mt-2 rounded-3xl bg-gray-900">
          {StartingImageSet && (
            <img
              src={bg2}
              className="rounded-2xl h-[400px] w-[500px] border-[3px] border-violet-800"
            />
          )}

          {(loading2 || loading3 || resultLoading2 || resultLoading3) && (
            <div className="flex gap-7  px-8 py-7">
              <img
                src={ImageData2}
                alt="ImageData"
                className="rounded-2xl h-[400px] w-[500px]
                    border-yellow-400 border-[4px]

                  "
              />
              <img
                src={ImageData3}
                alt="ImageData"
                className="rounded-2xl h-[400px] w-[500px] border-yellow-400 border-[4px]"
              />
            </div>
          )}
        </div>

        <div className="w-[800px] mx-auto mt-2">
          <textarea
            style={{ height: "auto" }} // Inline style for dynamic height
            onChange={handleChange}
            value={InputText}
            placeholder="Input your prompt to generate image"
            className="w-full min-h-[40px] max-h-[100px] overflow-y-auto resize-none px-7 py-2
                  border-black border-[1.5px] rounded-3xl bg-gray-600 text-pink-200 
                "
          />
        </div>

        <div
          onClick={() => Clickhandler()}
          className="px-8 py-2 rounded-2xl bg-black text-yellow-500 transition-all duration-300
          font-bold hover:bg-gray-300 hover:scale-95 text-3xl hover:text-black
          mx-auto hover:cursor-pointer border-2 border-green-400
          "
        >
          Generate Image
        </div>
      </div>
    </div>
  );
};

export default TextToImage;
