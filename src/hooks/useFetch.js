import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (queryTerm, nextPageUrl, cuisineType, mealType) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${queryTerm}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
        if (nextPageUrl) {
          url = nextPageUrl;
        } else if (cuisineType !== "All" && mealType === "All") {
          url = url + `&cuisineType=${cuisineType}`;
        } else if (cuisineType === "All" && mealType !== "All") {
          url = url + `&mealType=${mealType}`;
        } else if (cuisineType !== "All" && mealType !== "All") {
          url = url + `&cuisineType=${cuisineType}&mealType=${mealType}`;
        }

        const response = await axios.get(url);
        const data = response.data;
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [nextPageUrl, queryTerm, cuisineType, mealType]);

  return { recipes, loading, error };
};

export default useFetch;
