import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../style/home.css"

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="home-wrapper">
        <button onClick={() => navigate("/lfg")}>Look for a Group</button>
        <button onClick={() => navigate("/create")}>Create a Group</button>
        <button onClick={() => navigate("/about")}>About Byblos</button>
    </div>
  )
}

export default Home