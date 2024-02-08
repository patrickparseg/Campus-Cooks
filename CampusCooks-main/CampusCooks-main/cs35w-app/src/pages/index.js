import React, { useEffect } from 'react';
import RenderRecipes from '../components/renderRecipes';
import GetRecipeID from '../data/getRecipeId';
import { getAuth } from "firebase/auth";
import { useState } from "react";


const favorite = () => {
  window.location.assign('/favorite')
}

const Home = () => {
  const [userIsSignin, setuserIsSignin] = useState(false);

  const Greeting = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setuserIsSignin(true)
      return "Welcome! " + user.email;
    } else {
      return "Welcome! Guest.";
    }
  }
  const FavButton = () => {
    return (
      <button onClick={favorite} className='btn'>Your Favorites</button>
    )
  }
  
  const ids = GetRecipeID();
  
  return (
    <div>
      <div><h1 class="welcome"><Greeting /></h1> </div>
      <div>{userIsSignin && <FavButton />} </div>
      <div id="outer"><h3><RenderRecipes recipeIds={ids} /></h3></div>
    </div>
  );
};

export default Home;