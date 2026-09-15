import RecipeCard from "./components/RecipeCard"
import recipes from "./data/recipes.js"
function App() {
  return (
    <div className="app">
      <h1>My Recipe App</h1>

      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}

    </div>
  )
}

export default App