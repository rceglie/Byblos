import React, { useEffect, useState } from 'react';
import "../../style/roleselect.css";
import { Switch, FormControlLabel } from '@mui/material';

const SingleRoleSelect = (props) => {

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
        if (!modal){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setModal(!modal)
    };

    useEffect(() => {
    })

    // if(modal) {
    //     document.body.classList.add('active-modal')
    //   } else {
    //     document.body.classList.remove('active-modal')
    //   }
    
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
        <div className="rolebtn">
            <button type="button1" onClick={toggleModal} className="btn-modal1 addbtn">Role Select Menu</button>
        </div>
    
          {modal && (
            <div className="modal1">
              <div onClick={toggleModal} className="overlay1"></div>
              <div className="modal-content1">
                <button className="close-modal1" onClick={toggleModal}> CLOSE</button>
                <h2>Select Your Role(s)</h2>
                <p>Choose the roles you play.
                </p>
                <div className="role-container1">
                    {Object.keys(options2).map((item) =>
                        <div className={`role-group ${item}`}>
                            <FormControlLabel className="role-title" disabled={control.item} key={item} control={<Switch value={item} checked={checked.item} onChange={handleChange}/>} label={`${item.charAt(0).toUpperCase() + item.slice(1)} (ANY)`} labelPlacement="start"/>
                            {options2[item].map((item2) => 
                                <FormControlLabel disabled={control[item2]} key={item2} control={<Switch value={item2} checked={checked.item2} onChange={handleChange}/>} label={item2} labelPlacement="start"/> 
                            )}
                        </div>
                    )}
                </div>
                <button onClick={submitRoles}>Confirm Roles</button>
              </div>
            </div>
          )}
          </>
      );
}

export default SingleRoleSelect;
