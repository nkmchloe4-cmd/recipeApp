import { useState, useEffect } from "react"

function AddRecipeForm({ onRecipeAdded, onRecipeUpdated, existingRecipe, onCancel }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [steps, setSteps] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name)
      setDescription(existingRecipe.description)
      setCookTime(existingRecipe.cookTime)
      setIngredients(existingRecipe.ingredients.join("\n"))
      setSteps(existingRecipe.steps.join("\n"))
    }
  }, [existingRecipe])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      let imagePath = existingRecipe ? existingRecipe.imagePath : null

      if (file) {
        const formData = new FormData()
        formData.append("file", file)

        const uploadResponse = await fetch("http://localhost:5205/api/recipes/upload", {
          method: "POST",
          body: formData
        })

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text()
          throw new Error(errorText || "Bilduppladdning misslyckades")
        }

        const uploadData = await uploadResponse.json()
        imagePath = uploadData.path
      }

      const recipeData = {
        name,
        description,
        cookTime,
        ingredients: ingredients.split("\n").filter(line => line.trim() !== ""),
        steps: steps.split("\n").filter(line => line.trim() !== ""),
        imagePath
      }

      if (existingRecipe) {
        const response = await fetch(`http://localhost:5205/api/recipes/${existingRecipe.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipeData)
        })

        if (!response.ok) {
          throw new Error("Kunde inte uppdatera receptet")
        }

        const updatedRecipe = await response.json()
        onRecipeUpdated(updatedRecipe)
      } else {
        const response = await fetch("http://localhost:5205/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipeData)
        })

        if (!response.ok) {
          throw new Error("Kunde inte lägga till receptet")
        }

        const savedRecipe = await response.json()
        onRecipeAdded(savedRecipe)
      }

      setName("")
      setDescription("")
      setCookTime("")
      setIngredients("")
      setSteps("")
      setFile(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>{existingRecipe ? "Redigera recept" : "Lägg till nytt recept"}</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Tillagningstid (t.ex. 30 minuter)"
        value={cookTime}
        onChange={(e) => setCookTime(e.target.value)}
        required
      />

      <textarea
        placeholder="Ingredienser (en per rad)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <textarea
        placeholder="Steg (en per rad)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Sparar..." : existingRecipe ? "Spara ändringar" : "Lägg till recept"}
      </button>

      {existingRecipe && (
        <button type="button" onClick={onCancel}>
          Avbryt
        </button>
      )}
    </form>
  )
}

export default AddRecipeForm