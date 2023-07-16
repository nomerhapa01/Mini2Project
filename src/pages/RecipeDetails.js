import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { NavigationBar } from "../components/Navbar/NavigationBar";
import { SubHeader } from "../components/Header/SubHeader";
import { Footer } from "../components/Footer/Footer";
import { SingleFood } from "../components/Foods/SingleFood";
import ScrollToTop from "react-scroll-to-top";

export const RecipeDetails = () => {
  const params = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useTitle(`${recipes.label} | Chef Murk Kitchen`);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/${params.id}?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.recipe);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="murk-success-fetch absolute bg-white z-20 h-full w-full flex items-center justify-center">
        <div className="flex items-center">
          <span className="text-3xl mr-4">Loading</span>
          <svg
            className="animate-spin h-8 w-8 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="murk-failed-fetch text-xl font-semibold mx-10">
        Sorry but the API you are trying to fetch from reached it's limit. Try
        again later.
      </div>
    );
  }

  return (
    <>
      <NavigationBar />
      <SubHeader />
      <SingleFood />
      <Footer />
      <ScrollToTop smooth />
    </>
  );
};
