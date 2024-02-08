import React, { useState, useRef } from 'react';
import RenderRecipes from '../components/renderRecipes';
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import IngredientsList from './IngredientsList';

function SearchRecipe (props) {
    const [ids, setIds] = useState([]);
    const [current_selection, setSelection] = useState("Recipe Name");
    const [ingredients, setIngredients] = useState(
        [ {id: 1},
          {id: 2},
        ]
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        GetSearch()
            .then(function(list) {
                setIds(list);
            })
            .catch(function(list) {
                console.log("something went wrong");
                return;
            })    
    }

    const GetSearch = async () => {
        let list = [];
        let search = ""
        let searchIngredients = [];
        if (current_selection == "Recipe Name") {
            if (document.getElementById("searchBar").value) {
                search = (document.getElementById("searchBar").value).toLowerCase();
            }
            if (search === "") {
                alert("Search is empty");
                return list;
            }
        }
        else if (current_selection == "User") {
            if (document.getElementById("searchBar").value) {
                search = (document.getElementById("searchBar").value).toLowerCase();
            }
            if (search === "") {
                alert("Search is empty");
                return list;
            }
        }
        else if (current_selection == "Cost") {
            let search_string = -1;
            if (document.getElementById('cost').value) {
                search_string = document.getElementById('cost').value;
            }
            search = parseFloat(search_string);

            if (search < 0) {
                alert("Please enter a valid cost.");
                return list;
            }
        }
        else if (current_selection == "Ingredients") {
            for (let i = 1; i <= ingredients.length; i++) {
                searchIngredients.push(document.getElementById(("ingredient" + i)).value);
            }
            searchIngredients = searchIngredients.filter(element => element !== "");
            searchIngredients = searchIngredients.map(word => word.toLowerCase());
            searchIngredients = searchIngredients.filter((c, index) => { 
                return searchIngredients.indexOf(c) === index; });

            if (searchIngredients.length == 0) {
                alert("Search is empty");
                return list;
            }
        }

        const querySnapshot = await getDocs(collection(db, "Upload"));
        querySnapshot.forEach((doc) => {

            //search by recipe name
            if (current_selection == "Recipe Name") {

                let title = (doc.data().Title);
                if (title) {
                    title = title.toLowerCase();
                    if (title.includes(search)) {
                        list.push(doc.id);
                    }
                }
            }
            //search by username
            else if (current_selection == "User") {

                let user = (doc.data().UserName);
                if (user) {
                    user = user.toLowerCase();
                    if (user.includes(search)) {
                        list.push(doc.id);
                    }
                }
            }
            //search by cost
            else if (current_selection == "Cost") {

                let cost = (doc.data().Cost);
                if (cost) {
                    if (search >= cost) {
                        list.push(doc.id);
                    }
                }
            }
            //search by ingredients
            else if (current_selection == "Ingredients") {

                let dataIngredients = (doc.data().Ingredients);    

                if ((dataIngredients.length <= searchIngredients.length) && (dataIngredients.length != 0)) {
                    let counter = 0;

                    for (let k = 0; k < dataIngredients.length; k++) {
                        for (let j = 0; j < searchIngredients.length; j++) {
                            if (dataIngredients[k].includes(searchIngredients[j]))
                                counter = counter + 1;
                        }
                    }
                    if (counter >= dataIngredients.length) {
                        list.push(doc.id);
                    }
                }
            }
            
        });
        return new Promise(function(resolve, reject) {
            resolve(list);
        }) 
    }

    const changeInput = (e) => {
        e.preventDefault();
        const current = document.getElementById("select").value;
        setSelection(current);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const currentsize = ingredients.length;
        const newIngredient = [ { id: currentsize+1} ];
        setIngredients(
            ingredients.concat(newIngredient)
        );
        
    };
    const handleRemove = (e) => {
        e.preventDefault();
        const newIngredients = ingredients.slice(0, ingredients.length-1)
        setIngredients(
            newIngredients
        );
    };
    
    return (
        <div>
        <div className="card-center">
            <br></br>
            <div>
                <label for="select">Search by:&nbsp;</label>
                <select id="select" onChange={changeInput}>
                    <option value="Recipe Name">Recipe Name</option>
                    <option value="Ingredients">Ingredients</option>
                    <option value="Cost">Cost</option>
                    <option value="User">User</option>
                </select>
            </div>
            <br></br>

            {
            ((current_selection == "Recipe Name")) && <div>
                <h3>
                    Find recipes by name!
                </h3>
                <input type="text" id="searchBar" size="40"></input>
                 <button onClick={handleSubmit}>Search</button>
            </div>
            }
            {
            ((current_selection == "User")) && <div>
                <h3>
                    Find recipes by User!
                </h3>
                <input type="text" id="searchBar" size="40"></input>
                 <button onClick={handleSubmit}>Search</button>
            </div>
            }
            {
                (current_selection == "Ingredients") &&
                <div>
                    <h3>
                        Find recipes you can make with ingredients you have on hand!
                    </h3>
                    <IngredientsList onAdd={handleAdd} onRemove={handleRemove} ingredients={ingredients}/>
                    <button onClick={handleSubmit}>Search</button>
                </div>
            }
            {
                (current_selection == "Cost") &&
                <div>
                    <h3>
                        Find recipes within your budget!
                    </h3>
                    <label for='cost'>
                        Cost $:&nbsp;
                    </label>
                    <input id='cost' type='number' min="0" max="1000" size="10" /> <br /> <br />
                    <button onClick={handleSubmit}>Search</button>
                </div>
            }
        </div>
        <div>
            <h2>({ids.length}) Results</h2>
            <div>
                {<RenderRecipes recipeIds={ids}/>}
            </div>
        </div>
        </div>
    )
}

export default SearchRecipe;