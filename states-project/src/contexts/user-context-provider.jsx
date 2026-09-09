import {useState, createContext} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = () => {
        setUser({name: "Chris", email: "chris@example.com"});
    };

    const logout = () => {
        setUser(null);
    };

    // Valor que acceden todos los componentes heredados 
    const contextValue = {
        user,
        login,
        logout,
    };
    return <UserContext.Provider value={contextValue}> {children} </UserContext.Provider>
};