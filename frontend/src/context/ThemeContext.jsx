import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider =({children})=>{
    const [isDark, setIsDark] = useState(()=>{
        const storedTheme = localStorage.getItem("theme");
        if(storedTheme){
            return storedTheme==="dark";
        }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    useEffect(() =>{
        const root =document.documentElement;
        if(isDark){
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }else{
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = ()=>{
        setIsDark((prev)=>!prev);
    };

    const value ={
        isDark,
        toggleTheme
    };

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme=()=>{
    const context=useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};