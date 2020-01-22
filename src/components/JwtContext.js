import React, {createContext,  useState} from "react";

export const JwtContext = createContext();

export const Datas=(props)=>{
    const [jwt,dispatch]=useState("");
    return(
        <JwtContext.Provider value={{jwt:jwt,updateFunction:dispatch}}>
           {props.children}
        </JwtContext.Provider>
    )
};