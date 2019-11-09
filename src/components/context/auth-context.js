import React, {useState} from 'react';
export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {

     }
})

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAutheticated] = useState(false);
    const loginHandler = () => {
        setIsAutheticated(true); 
    }
    return (
        <AuthContext.Provider value={
            {login: loginHandler,
            isAuth: isAuthenticated}
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider; 