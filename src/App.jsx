import {useState} from "react"
import RecipeCard from "./components/RecipeCard"
import RecipeDetails from "./components/RecipeDetails"
import recipes from "./data/recipes.js"

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

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

      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
    </div>
  )
}

export default App