import React from "react";
import './App.css';


import './components/NavbarElement.css';
import Route from './components/Router';
import Navbar from './components/Navbar';


import Home from './pages';
import About from './pages/about';
import Login from './pages/log_in';
import Upload from './pages/upload';
import Profile from './pages/profile';
import Edit from './pages/edit';
import Fav from "./pages/favorite";
import Search from "./pages/search";
import Recipe from "./pages/recipe";
import Other_profile from "./pages/others";

function App() {
  console.log(window.location.pathname);

  return (
    <div className='App'>
      <Navbar />
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/log_in">
        <Login />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
      <Route path="/user">
        <Profile />
      </Route>
      <Route path="/edit">
        <Edit />
      </Route>
      <Route path="/favorite">
        <Fav />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/recipe" >
        <Recipe />
      </Route>
      <Route path="/others" >
        <Other_profile />
      </Route>
    </div>
  );
}

export default App;

