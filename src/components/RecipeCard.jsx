import { getImageUrl } from "../utils/imageUrl"

function RecipeCard({ recipe, onSelect }) {
  return (
    <div className="recipe-card" onClick={onSelect}>
      <h2>{recipe.name}</h2>
      {recipe.imagePath && <img src={getImageUrl(recipe.imagePath)} alt={recipe.name} />}
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeCard;
