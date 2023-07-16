import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "./Foods.css";

export const SingleFood = () => {
  const params = useParams();
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/recipe_${params.id}?type=public&&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.recipe);
        setIngredients(data.recipe.ingredientLines);
        setNutrients(data.recipe.totalNutrients);
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
      <section className="my-12 max-w-screen-xl mx-auto px-6">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink text-3xl poppins mx-5 text-gray-500">
            Recipe Details
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <h5 className="text-xl poppins text-gray-500 pb-5 text-center">
          {recipes.label}
        </h5>

        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 mb-4 shadow-xl">
                  <img
                    className="w-full h-full object-cover"
                    src={recipes.image}
                    alt="Productimg"
                  />
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <div className="rounded-md bg-white shadow-xl p-8 border border-gray-300">
                  <div className="text-2xl font-bold text-red-700 mb-4">
                    Nutrition Facts
                  </div>
                  <table className="w-full text-sm leading-5">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">
                          Nutrients
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">
                          Amount per Serving (g)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 text-left font-medium text-gray-600">
                          Calories
                        </td>
                        <td className="py-3 px-4 text-end pr-10">
                          {Math.round(recipes.calories)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-left font-medium text-gray-600 pl-8">
                          Saturated Fat
                        </td>
                        <td className="py-3 px-4 text-end pr-10">
                          {Math.round(nutrients.FASAT?.quantity)}
                          {nutrients.FASAT?.unit}
                        </td>
                      </tr>

                      <tr>
                        <td className="py-3 px-4 text-left font-medium text-gray-600">
                          Cholesterol
                        </td>
                        <td className="py-3 px-4 text-end pr-10">
                          {Math.round(nutrients.CHOLE?.quantity)}
                          {nutrients.CHOLE?.unit}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 text-left font-medium text-gray-600">
                          Sodium
                        </td>
                        <td className="py-3 px-4 text-end pr-10">
                          {Math.round(nutrients.NA?.quantity)}{" "}
                          {nutrients.NA?.unit}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-left font-medium text-gray-600">
                          Total Carbohydrate
                        </td>
                        <td className="py-3 px-4 text-end pr-10">
                          {Math.round(nutrients.CHOCDF?.quantity)}
                          {nutrients.CHOCDF?.unit}
                        </td>
                      </tr>

                      <tr>
                        <td className="py-3 px-4 text-left font-medium text-gray-600 pl-8">
                          Sugars
                        </td>
                        <td className="py-3 px-4 text-end pr-10">
                          {Math.round(nutrients.SUGAR?.quantity)}
                          {nutrients.SUGAR?.unit}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-3 px-4 text-left font-medium text-gray-600">
                          Protein
                        </td>
                        <td className="py-3 px-4 text-end pr-10">
                          {Math.round(nutrients.PROCNT?.quantity)}
                          {nutrients.PROCNT?.unit}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-1">
        <div className="container mx-auto px-2">
          <div className="flex flex-wrap -mx-4 mt-12">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-md bg-white shadow-md p-8">
                <div className="text-2xl font-bold text-red-700 mb-4">
                  Ingredients
                </div>
                <ul className="list-disc ml-5">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="pt-1">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-md bg-white shadow-md p-8">
                <div className="text-2xl font-bold text-red-700 mb-4">
                  More Recipe Info
                </div>
                <ul className="ml-5">
                  <li>
                    <span className="font-bold text-black-500">
                      Dish Type :{" "}
                    </span>{" "}
                    {recipes.dishType}
                  </li>
                  <li className="pt-2">
                    <span className="font-bold text-black-500">
                      Cuisine Type :{" "}
                    </span>{" "}
                    {recipes.cuisineType}
                  </li>
                  <li className="pt-2">
                    <span className="font-bold text-black-500">
                      Meal Type :{" "}
                    </span>{" "}
                    {recipes.mealType}
                  </li>

                  <li className="pt-2">
                    <span className="font-bold text-black-500">
                      Cautions :{" "}
                    </span>
                    {recipes.cautions}
                  </li>

                  <li className="pt-2">
                    <span className="font-bold text-black-500">Yield : </span>
                    {recipes.yield}
                  </li>

                  <li className="pt-2">
                    <span className="font-bold text-black-500">
                      Daily Weight :{" "}
                    </span>
                    {recipes.totalWeight}
                  </li>

                  <li className="pt-2">
                    <span className="font-bold text-black-500">
                      Cooking Time :{" "}
                    </span>
                    {recipes.totalTime} Mins
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-md bg-white shadow-md p-8">
                <div className="text-2xl font-bold text-red-700 mb-4">
                  Reference Links
                </div>
                <ul className="ml-5">
                  <li>
                    <span className="flex font-bold text-black-500">
                      Tutorial :{" "}
                    </span>
                    <Link
                      to={recipes.url}
                      target="_blank"
                      className="text-gray-600 hover:text-red-600"
                    >
                      Open Website
                    </Link>
                  </li>
                  <li>
                    <span className="flex font-bold text-black-500 mt-2">
                      ShareAs :{" "}
                    </span>
                    <Link
                      to={recipes.shareAs}
                      target="_blank"
                      className="text-gray-600 hover:text-red-600"
                    >
                      Open Website
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
