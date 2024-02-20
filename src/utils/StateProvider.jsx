import {  createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider= ({children, initialState, reducer})=>( 

<StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
</StateContext.Provider>
    
)

export const useStateProvider = () => useContext(StateContext) 

//State provider  se utiliza para proporcionar un estado a los componentes secundarios sin necesidad de pasar props manualmente a través de cada nivel del árbol de componentes.

