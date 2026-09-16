function RecipeCard({recipe, onSelect}) {
  return (
    <div className="recipe-card" onClick={onSelect}>
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeCard;
