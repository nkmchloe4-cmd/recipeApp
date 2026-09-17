import { getImageUrl } from "../utils/imageUrl"

function RecipeCard({ recipe, onSelect, onDelete, onEdit }) {
  function handleDeleteClick(e) {
    e.stopPropagation()
    onDelete(recipe.id)
  }

  function handleEditClick(e) {
    e.stopPropagation()
    onEdit(recipe)
  }

  return (
    <div className="recipe-card" onClick={onSelect}>
      <h2>{recipe.name}</h2>
      {recipe.imagePath && <img src={getImageUrl(recipe.imagePath)} alt={recipe.name} />}
      <p>{recipe.description}</p>
      <button onClick={handleEditClick}>Redigera</button>
      <button onClick={handleDeleteClick}>Ta bort</button>
    </div>
  );
}

export default RecipeCard;