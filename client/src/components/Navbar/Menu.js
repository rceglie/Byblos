import React, { useEffect, useState } from 'react';
import "../../style/menu.css";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Menu = (props) => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        if (!modal){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (document.getElementById("box-content") != null) {
          if (!modal){
            setModal(true)
            document.getElementById("box-content").className = "box slide-in";
          } else {
            document.getElementById("box-content").className = "box slide-out";
            setTimeout(function(){
              setModal(!modal);
            }.bind(this),500);
          }
        }
        else{
          setModal(true)
        }
      
    };

    useEffect(() => {
        console.log(modal)
    })

    if(modal) {
        document.body.classList.add('active-modal2')
    } else {
        document.body.classList.remove('active-modal2')
    }
    
    return (
        <>
        <Button onClick={toggleModal} >
            <MenuIcon style={{color: "#0000FF"}} sx={{ fontSize: 70 }}/>
        </Button>
    
          {modal && (
            <div className="">
              <div className="popup-box">
                <div id="box-content" className="box slide-in">
                  <div className="menu-header">
                    <button onClick={toggleModal} className="close-btn">
                      <KeyboardArrowLeftIcon style={{color: "#0000FF"}} sx={{ fontSize: 70 }}/>
                    </button>
                    <p className="menu-title">Menu Stuff</p>
                  </div>
                  <div className="menu-buttons">
                    <button>Create Post</button>
                    <button>My Posts</button>
                    <button>Account Info</button>
                    <button>About Byblos</button>
                  </div>
                </div>
              </div>
                
            </div>
          )}
          </>
      );
}

export default Menu;