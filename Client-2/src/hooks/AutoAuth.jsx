import React, {createContext, useContext, useEffect, useState } from 'react'

const userData = createContext()
export const userContext = ()=>{return  useContext(userData);}
const AutoAuth = ({children}) => {
    const [User,setUser] = useState(null);
    const [loading,setloading]=useState(true);
useEffect(() => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            console.log('The user is not signed in');
        } else {
            console.log('AutoAuth found', user);
            setUser(user);
        }
    } catch (error) {
        console.log('There is an error', error);
    } finally {
        setloading(false); 
    }
}, []);

    const logout = ()=>{
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('cofiesta_projects')
    }
    const uploadDetails = (url,institution,bios,github) => {
    if (!User) return;
    console.log('the data is flying away')
    console.log('there is no ',github)

    const updatedUser = { ...User, imageUrl: url ,institution:institution,bios:bios,github:github};
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
};


  return (
    <userData.Provider value={{User,setUser,loading,logout,uploadDetails}}>
        {children}
    </userData.Provider>
  )
}

export default AutoAuth