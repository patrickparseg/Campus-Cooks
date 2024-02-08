import React from "react";

function IngredientsBox(props) {
    
    return (
        <div>
            <label>Ingredient {props.count}:&nbsp;
            </label>
            <input type="text" id={props.id} size="20">
            </input>
        </div>
    );
}

export default IngredientsBox;