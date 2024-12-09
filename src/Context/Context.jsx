/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../config/Gemini";



export const Context = createContext();

const ContextProvider = (props) => {

    const [inputValue, SetinputValue] = useState("");
    const [loading, Setloading] = useState(false);
    const [OutputData, SetOutputData] = useState("");

    const delayPara = (index, word) => {
        setTimeout(() => {
            SetOutputData((prev) => prev+word);
        }, 30*index)
    }
    
    const onSent = async (inputValue) => {
        Setloading(true);
        SetOutputData("");
        const result =  await run(inputValue);
        const result2 = result.split("**");

        let NewArray = [];
        let k = 0;
        for(let i=0; i<result2.length; i++)
        {
            if(i==0 || !(i&1))
            {
                NewArray[k++] = result2[i];
            }
            else
            {
                NewArray[k++] = "<br/>"
                NewArray[k++] ="<b>" 
                NewArray[k++] = result2[i] 
                NewArray[k++] = "</b>"
                NewArray[k++] ="<br/>"
            }
        }

        let NewArrayCopy = [...NewArray];

        for(let i=0; i<NewArray.length; i++)
        {
            if(typeof NewArrayCopy[i] === 'string' && NewArrayCopy[i] === "\n\n* ")
            {
                NewArrayCopy[i-4] = "<b>"
                NewArrayCopy[i-2] = "</b>"
                NewArrayCopy.splice(i-5, 0, "<br/>")
                NewArrayCopy.splice(i+1, 2);
            }

            // if(i+1 < NewArray.length - 1 && NewArray[i] === "\n\n*")
            // {

            //     NewArray.splice(i, 1);
            //     NewArray.splice(i-1, 0, "<br/><b>");
            //     let temp = NewArray[i+1];
            //     let prevtemp = "<h1>";
            //     temp = prevtemp + temp + "<h1/>";
            //     NewArray[i+1] = temp;
            // }
        }

        let NewArrayJoin = NewArrayCopy.join(" ");
        const x = NewArrayJoin.split("*").join("<br/>");
        let y = x.split(" ");
        for(let i=0; i<y.length; i++)
        {
            const newWord = y[i];
            delayPara(i, newWord+" ")
        }

        Setloading(false)
    }


    const ContextValue = {
        onSent,
        inputValue,
        SetinputValue,
        loading,
        Setloading,
        OutputData,
        SetOutputData,
    }

    return (
        <Context.Provider value={ContextValue} >
            {
                props.children
            }
        </Context.Provider>
    )
}

export default ContextProvider