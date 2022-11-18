import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../style/home.css"

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-left">
        <h1 className="home-h1">Byblos</h1>
        <h2 className="home-h2">Final Fantasy XIV Static Finder</h2>
        <p className="home-p">The one-stop-shop for static recruiting.</p>
        <p>Click <a className="aboutus" onClick={() => navigate("/about")}>here</a> to read more about Byblos.</p>
      </div>
      <div className="home-right">
        <div className="home-group">
          <span>Looking for a group to raid with? Find groups that fit your needs!</span>
        <button className="button-36" onClick={() => navigate("/groups")}>Browse Groups</button>
        </div>
        <div className="home-group">
          <span>Are you leading a group? Find players to join yours!</span>
        <button className="button-36" onClick={() => navigate("/create")}>Browse Players</button>
        </div>
        <div className="home-group">
          <span>Update your profile to let leads find you or create your own group</span>
        <button className="button-36" onClick={() => navigate("/about")}>My Information</button>
        </div>
      </div>
    </div>
  )
}

export default Home