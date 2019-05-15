import React from "react";

const GlobalState = React.createContext({});

export const GlobalStateProvider = GlobalState.Provider;
export const GlobalStateConsumer = GlobalState.Consumer;
