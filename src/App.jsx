import { useState, useEffect } from "react";
import AddRecipeForm from "./components/AddRecipeForm";
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5205/api/recipes")
      .then((response) => {
        if (!response.ok)
          throw new Error("Kunde inte hämta recept från servern");
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) =>
        setLoadError(
          "Kunde inte hämta recept från servern. Kontrollera att backend körs.",
        ),
      );
  }, []);

  function handleRecipeAdded(newRecipe) {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  }

  function handleRecipeUpdated(updatedRecipe) {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    );
    setEditingRecipe(null);
    setSelectedRecipe(updatedRecipe);
  }

  async function handleDeleteRecipe(id) {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort detta recept?",
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5205/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kunde inte ta bort receptet");
      }

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id),
      );
      setSelectedRecipe(null);
    } catch (err) {
      alert(err.message);
    }
  }

  const showingForm = showAddForm || editingRecipe;
  const showingDetails = selectedRecipe && !showingForm;
  const showingList = !showingForm && !showingDetails;

  return (
    <div className="app">
      <div className="app-header">
        <h1>My Recipe App</h1>
        {showingList && (
          <button
            className="add-recipe-button"
            onClick={() => setShowAddForm(true)}
          >
            + Lägg till nytt recept
          </button>
        )}
      </div>

      {loadError && <p className="error-message">{loadError}</p>}

      {showingForm && (
        <AddRecipeForm
          key={editingRecipe ? editingRecipe.id : "new"}
          onRecipeAdded={(recipe) => {
            handleRecipeAdded(recipe);
            setShowAddForm(false);
          }}
          onRecipeUpdated={handleRecipeUpdated}
          existingRecipe={editingRecipe}
          onCancel={() => {
            setEditingRecipe(null);
            setShowAddForm(false);
          }}
        />
      )}

      {showingDetails && (
        <RecipeDetails
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
          onEdit={setEditingRecipe}
          onDelete={handleDeleteRecipe}
        />
      )}

      {showingList && (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      )}

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>My Recipe App</h4>
            <p>Dela och upptäck goda recept enkelt och snabbt.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 My Recipe App. Byggt av Chloe N.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
