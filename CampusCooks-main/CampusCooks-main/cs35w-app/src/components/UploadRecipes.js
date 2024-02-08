import { db } from "../firebase"
import { addDoc, collection } from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import IngredientsList from "./IngredientsList";
import React, { useState } from "react";

const auth = getAuth();


function UploadRecipes() {
    const [catergory, setCatergory] = useState("Salad")

    const onOptionChange = e => {
        setCatergory(e.target.value)
    }


    const [ingredients, setIngredients] = useState(
        [{ id: 1 },
        { id: 2 },
        ]
    )
    const handleAdd = (e) => {
        e.preventDefault();
        const currentsize = ingredients.length;
        const newIngredient = [{ id: currentsize + 1 }];
        setIngredients(
            ingredients.concat(newIngredient)
        );

    };
    const handleRemove = (e) => {
        e.preventDefault();
        const newIngredients = ingredients.slice(0, ingredients.length - 1)
        setIngredients(
            newIngredients
        );
    };

    function handleSubmit(e) {
        e.preventDefault();
        const ref = collection(db, "Upload");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let listOfIngredients = [];

                for (let i = 1; i <= ingredients.length; i++) {
                    listOfIngredients.push(document.getElementById(("ingredient" + i)).value);
                }
                //remove blank
                listOfIngredients = listOfIngredients.filter(element => element !== "");
                //convert all to lowercase (for searching purposes)
                listOfIngredients = listOfIngredients.map(word => word.toLowerCase());
                //remove duplicates
                listOfIngredients = listOfIngredients.filter((c, index) => { 
                    return listOfIngredients.indexOf(c) === index;
                });

                const title = document.getElementById('title').value.trim();
                const rec = document.getElementById('Recipe').value.trim();
                const cost = document.getElementById('cost').value;

                if (title === "" || rec === "" || !cost || listOfIngredients.length === 0) {
                    alert("All fields must be filled out.");
                    return;
                }

                let recipe = {
                    Title: document.getElementById('title').value,
                    Ingredients: listOfIngredients,
                    Recipe: document.getElementById('Recipe').value,
                    UserName: user.email,
                    UserId: user.uid,
                    upvotes: 0,
                    Catergory: catergory,
                    Comments: [],
                    Cost: document.getElementById('cost').value
                }
                try {
                    addDoc(ref, recipe)
                } catch (err) {
                    console.log(err)
                }
                console.log(recipe);
                alert('Your recipe was submitted successfully! :D');
                document.getElementById("uploadForm").reset();
            }
            else {
                alert("You must sign in before uploading your recipe!");
                window.location.assign('log_in');
            }
        });
    };

    return (
        <div >
            <h1> Upload your recipe! </h1>
            <label> Note: You must log in before you can upload your recipe.</label>

            <form className='cardTextArea' id="uploadForm">
                <div>
                    <label>
                        Title: <br />
                    </label>
                    <input id='title' type='text' size="55" /> <br />
                    <label>
                        Recipe: <br />
                    </label>
                    <textarea id='Recipe' type='text' rows="10" cols="45" placeholder='Write your recipe here!' />
                </div>

                <IngredientsList
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    ingredients={ingredients}
                />

                <div>
                    <label>
                        Cost $: <br />
                    </label>
                    <input id='cost' type='number' min="0" max="1000" size="10" /> <br />
                </div>
                <br></br>
                <div className="card" size="10">
                    <h3>Select A Category</h3>

                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Meat"
                        id="Meat"
                        checked={catergory === "Meat"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Meat">Meat</label>

                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Seafood"
                        id="Seafood"
                        checked={catergory === "Seafood"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Seafood">Seafood</label>

                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Vegan"
                        id="Vegan"
                        checked={catergory === "Vegan"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Vegan">Vegan</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Pasta"
                        id="Pasta"
                        checked={catergory === "Pasta"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Pasta">Pasta</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Salad"
                        id="Salad"
                        checked={catergory === "Salad"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Salad">Salad
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Dessert"
                        id="Dessert"
                        checked={catergory === "Dessert"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Dessert">Dessert</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Breakfast"
                        id="Breakfast"
                        checked={catergory === "Breakfast"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Breakfast">Breakfast</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Soup"
                        id="Soup"
                        checked={catergory === "Soup"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Soup">Soup</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="Snack"
                        id="Snack"
                        checked={catergory === "Snack"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="Snack">Snack</label>
                    <p>
                        Category: <strong>{catergory}</strong>
                    </p>
                </div>
                <br></br>
                <input className='btn' onClick={handleSubmit} type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default UploadRecipes
