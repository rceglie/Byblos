import React, { useEffect, useState } from 'react';
import "../../style/menu.css";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
    })

    if(modal) {
        document.body.classList.add('active-modal2')
    } else {
        document.body.classList.remove('active-modal2')
    }
    
    return (
        <>
          <ul>
              <li>
                <a className="actions">
                  Actions
                </a>
                <ul className="submenu">
                  <li><a href="/create">Create Post</a></li>
                  <li><a >My Posts</a></li>
                  <li><a >Account Info</a></li>
                  <li><a >About Byblos</a></li>
                </ul>
              </li>
            </ul>
          </>
      );
}

export default Menu;