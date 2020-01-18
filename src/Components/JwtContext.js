import React, {createContext, useState} from "react";

export const JwtContext = createContext();

const updateReducer=(state,action)=>{
    if (action.type === "change") {
        return action.value;
    } else {
        return state;
    }
}

export const Datas=(props)=>{
    const [jwt,setJwt]=useState();
    return(
        <JwtContext.Provider value={[jwt,setJwt]}>
           {props.children}
        </JwtContext.Provider>
    )
};