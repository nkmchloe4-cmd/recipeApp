function RecipeCard({recipe}) {
  return (
    <div className="recipe-card">
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeCard;
