import React, { useEffect, useState } from 'react';
import "../../style/menu.css";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

const Menu = (props) => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        if (!modal){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setModal(!modal)
    };

    useEffect(() => {
        
    })

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    
    return (
        <>
        <Button onClick={toggleModal} >
            <MenuIcon sx={{ fontSize: 70 }}/>
        </Button>
    
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <button className="close-modal" onClick={toggleModal}> CLOSE</button>
                <h2>Cool menu</h2>
                <button>Create Post</button>
                <button>My Posts</button>
                <button>Account Info</button>
                <button>About Byblos</button>
              </div>
            </div>
          )}
          </>
      );
}

export default Menu;