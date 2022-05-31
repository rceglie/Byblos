import React, { useEffect, useState } from 'react';
import "../../style/menu.css";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Menu = (props) => {

    const [modal2, setModal2] = useState(false);

    const toggleModal2 = () => {
        if (!modal2){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setModal2(!modal2)
    };

    useEffect(() => {
        
    })

    if(modal2) {
        document.body.classList.add('active-modal2')
    } else {
        document.body.classList.remove('active-modal2')
    }
    
    return (
        <>
        <Button onClick={toggleModal2} >
            <MenuIcon style={{color: "#0000FF"}} sx={{ fontSize: 70 }}/>
        </Button>
    
          {modal2 && (
            <div className="">
              <div className="popup-box">
                <div className="box">
                  <div className="menu-header">
                    <button onClick={toggleModal2} className="close-btn">
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