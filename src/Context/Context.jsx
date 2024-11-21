/* eslint-disable react/prop-types */
import { createContext } from "react";
import run from "../config/Gemini";


let Context = createContext();

const ContextProvider = (props) => {


    const onSent = async (prompt) => {
        await run(prompt);
    }

    onSent("Give me top 20 Js and React Questions");

    const ContextValue = {

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