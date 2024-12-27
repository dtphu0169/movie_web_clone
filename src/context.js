import React , { useContext, useEffect, useState } from "react";

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [isLoading, setisLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show: false, msg: ""});
    const [query, setQuery] = useState('titanic');    

    const getMovies = async(url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log("data", data);
            if (data.Response === "True") {
                setisLoading(false);
                setMovie(data.Search);
            } else {
                setIsError({
                    show: true,
                    msg: data.error,
                })
            }
        } catch (error) {
            console.log("getData error ",error);
        }
    }

    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 800);

        return () => clearTimeout(timeOut);
    }, [query]);

    return (
        <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery}}> {children} </AppContext.Provider>
    )
};


const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}
