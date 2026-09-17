import { useState, useEffect } from "react";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5205/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  function handleRecipeAdded(newRecipe) {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  }

  function handleRecipeUpdated(updatedRecipe) {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
    );
    setEditingRecipe(null);
  }

  async function handleDeleteRecipe(id) {
    try {
      const response = await fetch(`http://localhost:5205/api/recipes/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Kunde inte ta bort receptet");
      }

      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));

      if (selectedRecipe && selectedRecipe.id === id) {
        setSelectedRecipe(null);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="app">
      <h1>My Recipe App</h1>

      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelect={() => setSelectedRecipe(recipe)}
          onDelete={handleDeleteRecipe}
          onEdit={setEditingRecipe}
        />
      ))}

      <AddRecipeForm
        key={editingRecipe ? editingRecipe.id : "new"}
        onRecipeAdded={handleRecipeAdded}
        onRecipeUpdated={handleRecipeUpdated}
        existingRecipe={editingRecipe}
        onCancel={() => setEditingRecipe(null)}
      />

      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
    </div>
  );
}

export default App;
