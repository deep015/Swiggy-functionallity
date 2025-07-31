import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import UserContext from "./Utils/UserContext";



const App = () => {
   const [userName,setUserName]=useState();

   //authentication

  useEffect(()=>{
     const data ={
         name:"Rahul"
   };
   setUserName(data.name);
  },[])
  return (
    <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
    <div className="app">
      <Header />
      <Outlet />
    </div>
    </UserContext.Provider >
  );
};

export default App;
