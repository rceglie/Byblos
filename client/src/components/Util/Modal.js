import React, { useEffect, useState } from 'react';
import styles from "./modal.module.css";
import { Switch, FormControlLabel } from '@mui/material';

const BetterRoleSelect = (props) => {

    const options = ["tank","war","pld","drk","gnb","healer","sge","whm","sch","ast","dps","melee","sam","nin","rpr","drg","mnk","ranged","dnc","brd","mch","caster","rdm","smn","blm"];

    const options2 = {"melee":["sam","nin","rpr","drg","mnk"],
                        "ranged":["dnc","brd","mch"],
                        "caster":["rdm","smn","blm"],
                        "tank":["war","pld","drk","gnb"],
                        "healer":["sge","whm","sch","ast"]}

    const [modal, setModal] = useState(false);
    const [roles, setRoles] = useState([]);
    let initial = Object.fromEntries(new Map(
        options.map(object => {
            return [object,false];
        }),
    ));
    const [checked, setChecked] = useState(initial);
    const [control, setControl] = useState(initial);

    const toggleModal = () => {
        setRoles(props.roles)
        if (!modal){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setModal(!modal)
    };

    useEffect(() => {
        //console.log(roles)
    })

    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
    
    const handleChange = (e) => {
        setChecked(prevState => ({...prevState, [e.target.value]:e.target.checked}))
        if (e.target.checked){ // If selected, add to array state
            if (Object.keys(options2).includes(e.target.value)){
                let newArray = roles.filter(item => !options2[e.target.value].includes(item))
                setRoles(newArray)
                for (let i = 0; i < options2[e.target.value].length; i++ ){
                    console.log(options2[e.target.value][i])
                    setRoles(prevState => ([...prevState, options2[e.target.value][i]]))
                }
            } else {
                setRoles(prevState => ([...prevState, e.target.value]))
            }
        } else {    // If deselected, remove from array state
            if (Object.keys(options2).includes(e.target.value)){
                let newArray = roles.filter(item => !options2[e.target.value].includes(item))
                setRoles(newArray)
            } else {
                setRoles((prevState) => prevState.filter((prevItem) => prevItem !== e.target.value));
            }
            
        }
        decideEnabled(e)
    }

    const decideEnabled = (c) => {
        if (Object.keys(options2).includes(c.target.value)){
            for (let i = 0; i < options2[c.target.value].length; i++ ){
                setControl(prevState => ({...prevState, [options2[c.target.value][i]]:c.target.checked}))
            }
        }
    }

    const submitRoles = () => {
        setControl(initial)
        setChecked(initial)
        props.parentCallback(roles)
        setRoles([])
        toggleModal()
    }

      return (
        <>
        <div className={styles.rolebtn}>
            <button type={styles.button} onClick={toggleModal} className={styles.modalbtn}>{props.label}</button>
        </div>
    
          {modal && (
            <div className={styles.modal}>
              <div onClick={toggleModal} className={styles.overlay}></div>
              <div className={styles.modalcontent}>
                <button className={styles.closebutton} onClick={toggleModal}>X</button>
                <h1>Select Jobs</h1>
                <button onClick={submitRoles}>Confirm Roles</button>
              </div>
            </div>
          )}
          </>
      );
}

export default BetterRoleSelect;
