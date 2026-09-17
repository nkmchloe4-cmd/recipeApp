import { useState } from "react"

function AddRecipeForm({ onRecipeAdded }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [steps, setSteps] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      let imagePath = null

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

      const newRecipe = {
        name,
        description,
        cookTime,
        ingredients: ingredients.split("\n").filter(line => line.trim() !== ""),
        steps: steps.split("\n").filter(line => line.trim() !== ""),
        imagePath
      }

      const response = await fetch("http://localhost:5205/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe)
      })

      if (!response.ok) {
        throw new Error("Kunde inte lägga till receptet")
      }

      const savedRecipe = await response.json()
      onRecipeAdded(savedRecipe)

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
      <h2>Lägg till nytt recept</h2>

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
        {loading ? "Lägger till..." : "Lägg till recept"}
      </button>
    </form>
  )
}

export default AddRecipeForm