import { useState, useEffect } from "react";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5205/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  function handleRecipeAdded(newRecipe) {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  }

  return (
    <div className="app">
      <h1>My Recipe App</h1>

      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelect={() => setSelectedRecipe(recipe)}
        />
      ))}

      <AddRecipeForm onRecipeAdded={handleRecipeAdded} />

      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
    </div>
  );
}

export default App;
