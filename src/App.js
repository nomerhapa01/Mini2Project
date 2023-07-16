import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorMessage } from "./components/ErrorMessage";
import { Home } from "./pages/Home";
import { RecipeDetails } from "./pages/RecipeDetails";
import { SearchResults } from "./pages/SearchResults";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Playground } from "./pages/Playground";
import { ContactUs } from "./pages/ContactUs";

function App() {

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/search" element={<SearchResults />}></Route>
          <Route path="/playground" element={<Playground />}></Route>
          <Route path="/search/:queryTerm" element={<SearchResults />} />
          <Route path="/search/:queryTerm/*" element={<ErrorMessage />} />
          <Route path="recipe/details/:id" element={<RecipeDetails />} />
          <Route path="recipe/details/:id/*" element={<ErrorMessage />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
