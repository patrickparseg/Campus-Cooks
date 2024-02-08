import IngredientsBox from "./IngredientsBox";

function IngredientsList(props) {

    return (
        <div>
            <label>Ingredients:</label>
            {props.ingredients.map(ingredient => (
                <IngredientsBox key={ingredient.id} 
                id={"ingredient" + ingredient.id}
                count={ingredient.id} />
            ))}
            <br></br>
            <button onClick={props.onAdd}>Add
            </button>
            <button onClick={props.onRemove}>Remove
            </button>
            <br></br><br></br>
        </div>
    );
}

export default IngredientsList;