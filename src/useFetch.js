import React, { useState, useEffect } from "react";

// setting the api link
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async(url) => {
    setIsLoading(true);
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("data", data);
        if (data.Response === "True") {
            setIsLoading(false);
            setIsError({
                show: false,
                msg: "",
            })
            setMovie(data.Search || data);
        } else {
            setIsError({
                show: true,
                msg: data.Error,
            })
        }
    } catch (error) {
        console.log("getData error ",error);
    }
}

  // debouncing in react js
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`${API_URL}&s=${apiParams}`);
    }, 800);

    return () => {
      clearTimeout(timeOut);
      console.log("clear");
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;