import {useState,useEffect} from "react"
import RecipeCard from "./components/RecipeCard"
import RecipeDetails from "./components/RecipeDetails"

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipes, setRecipes] =useState([])

  useEffect(() => {
    fetch("http://localhost:5205/api/recipes")
      .then((response) => response.json())
      .then(data => setRecipes(data))
  }, [])

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