function RecipeDetails({ recipe }) {
  return (
    <div className="recipe-details">
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