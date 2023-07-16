import React from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MainSearch = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [previousPageUrl, setPreviousPageUrl] = useState("");
  const [cuisineType, setCuisineType] = useState("All");
  const [mealType, setMealType] = useState("All");
  const { recipes, loading, error } = useFetch(
    params.queryTerm,
    nextPageUrl,
    cuisineType,
    mealType
  );

  const itemsPerPage = recipes.to - recipes.from + 1;
  const currentPage = Math.ceil(recipes.from / itemsPerPage);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
    setNextPageUrl("");
    navigate(`/search/${inputValue}`);
  };

  const handleSearch = () => {
    navigate(`/search/${inputValue}`);
  };

  const loadNextPage = () => {
    setPreviousPageUrl(nextPageUrl);
    setNextPageUrl(recipes._links.next.href);
  };

  const loadPreviousPage = () => {
    setNextPageUrl(previousPageUrl);
    setPreviousPageUrl("");
  };

  const handlePaginationClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCuisineTypeChange = (event) => {
    setCuisineType(event.target.value);
  };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  if (loading) {
    return (
      <div class="murk-success-fetch absolute bg-white z-20 h-full w-full flex items-center justify-center">
        <div class="flex items-center">
          <span class="text-3xl mr-4">Loading</span>
          <svg
            class="animate-spin h-8 w-8 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
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
        <div className="mx-auto">
          <form
            onSubmit={handleFormSubmit}
            class="flex flex-col md:flex-row gap-3"
          >
            <div class="flex">
              <input
                type="text"
                placeholder="Search for food ..."
                class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-gray-300 focus:outline-none focus:border-red-700"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                onClick={handleSearch}
                class="bg-red-700 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
              >
                Search
              </button>
            </div>
            <select
              id="cuisineType"
              name="cuisineType"
              value={cuisineType}
              onChange={handleCuisineTypeChange}
              class="w-full h-10 border-2 border-gray-300 focus:outline-none focus:border-red-700 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            >
              <option value="All" selected="">
                All Cuisine
              </option>
              <option value="American">American</option>
              <option value="Asian">Asian</option>
              <option value="British">British</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Italian">Italian</option>
            </select>

            <select
              id="mealType"
              name="mealType"
              value={mealType}
              onChange={handleMealTypeChange}
              class="w-full h-10 border-2 border-gray-300 focus:outline-none focus:border-red-700 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            >
              <option value="All" selected="">
                All Meal
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Dinner">Dinner</option>
              <option value="Lunch">Lunch</option>
              <option value="Snack">Snack</option>
              <option value="Teatime">Teatime</option>
            </select>
          </form>
        </div>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink text-3xl poppins mx-4 text-gray-500">
            Search Recipe
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <h5 className="capitalize poppins text-gray-500 pb-4 text-center">
          You are looking for {params.queryTerm} Recipes.
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {recipes.hits.length > 0 ? (
            recipes.hits.slice(0, 18).map((recipe) => (
              <Link
                to={`../recipe/details/recipe_${
                  recipe.recipe.uri.split("_")[1]
                }`}
              >
                <div
                  className="text-center bg-white shadow-xl border border-gray-100 transition transform duration-700 hover:shadow-2xl hover:scale-105 p-4 rounded-lg relative"
                  key={recipe.recipe.uri}
                >
                  <span
                    className={`${recipe.recipe.mealType} bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4`}
                  >
                    {recipe.recipe.mealType}
                  </span>
                  <img
                    className="w-64 mx-auto transform transition duration-300 hover:scale-105 rounded-3xl"
                    src={recipe.recipe.image}
                    alt="img-recipe"
                  />
                  <div className="flex flex-col items-center my-3 space-y-2">
                    <h1 className="text-gray-900 poppins text-center text-md food-label">
                      {recipe.recipe.label}
                    </h1>
                    <p className="text-gray-500 poppins text-sm text-center">
                      Dish Type : {recipe.recipe.dishType}
                    </p>
                    <p className="text-gray-500 poppins text-sm text-center">
                      Cuisine Type : {recipe.recipe.cuisineType}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <span>No Recipe's Found</span>
          )}
        </div>

        {/* Start of Pagination */}
        <div class="text-center mx-auto max-w-lg px-4 mt-12 bg-white sm:px-6">
          <span class="text-lg text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {recipes.from}{" "}
            </span>
            to{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {recipes.to}{" "}
            </span>
            of{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {recipes.count}{" "}
            </span>
            Recipes
          </span>
        </div>

        <div class="flex flex-1 mx-auto w-100 max-w-lg px-4 py-3 mt-12 bg-white border-t border-gray-200 shadow-md sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div
              className="relative z-0 flex justify-between w-full -space-x-px rounded-md"
              aria-label="Pagination"
            >
              {currentPage === 1 ? (
                <button
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 text-sm 5xl:text-xl font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-l-md opacity-50 cursor-not-allowed"
                  data-id="pagination-prev"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>{" "}
                  Previous Page
                </button>
              ) : (
                <button
                  onClick={() => {
                    loadPreviousPage();
                    handlePaginationClick();
                  }}
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 text-sm 5xl:text-xl font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-l-md"
                  data-id="pagination-prev"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>{" "}
                  Previous Page
                </button>
              )}

              <p className="flex items-center">Page {currentPage}</p>
              {recipes.to === recipes.count ? (
                <button
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 text-sm 5xl:text-xl   font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-r-md opacity-50 cursor-not-allowed"
                  data-id="pagination-next"
                >
                  Next Page{" "}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => {
                    loadNextPage();
                    handlePaginationClick();
                  }}
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 text-sm 5xl:text-xl   font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-r-md"
                  data-id="pagination-next"
                >
                  Next Page{" "}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* End of Pagination */}
      </section>
    </>
  );
};
