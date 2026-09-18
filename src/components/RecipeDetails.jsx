import { getImageUrl } from "../utils/imageUrl"

function RecipeDetails({ recipe, onBack, onEdit, onDelete }) {
  return (
    <div className="recipe-details">
      <div className="details-header">
        <button className="back-button" onClick={onBack}>← Tillbaka</button>
        <div className="details-actions">
          <button className="edit-button" onClick={() => onEdit(recipe)}>Redigera</button>
          <button className="delete-button" onClick={() => onDelete(recipe.id)}>Ta bort</button>
        </div>
      </div>

      {recipe.imagePath && <img src={getImageUrl(recipe.imagePath)} alt={recipe.name} />}

      <h2>{recipe.name}</h2>
      <p>Tillagningstid: {recipe.cookTime}</p>

      <h3>Ingredienser</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Steg</h3>
      <ul>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;