import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import GetData from "../data/getdata";
import { useEffect, useState } from "react";
import GetRecipeID from "../data/getRecipeId";




const About = () => {
  return (
    <div>

      <h1 className="card-center welcome">  <GetData collection="recipeAppAbout" document="about" field="headline" /></h1>
      <h3 className="card-center">  <GetData collection="recipeAppAbout" document="about" field="introduction" /></h3>



    </div>
  );
};

export default About;