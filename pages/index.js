import React from 'react'
import Nav from '../components/nav'
import SlotView from "./slots_view";
import Login from "./login";

const Home = ({loggedIn}) => (
  <div>
    {loggedIn ? <SlotView/> : <Login/>}
  </div>
);

export default Home
