import React, { useEffect, useState } from 'react';
//import "./memberselect.css";
import { Switch, FormControlLabel } from '@mui/material';

const MemberSelect = (props) => {

    const options = ["tank","war","pld","drk","gnb","healer","sge","whm","sch","ast","dps","melee","sam","nin","rpr","drg","mnk","ranged","dnc","brd","mch","caster","rdm","smn","blm"];

    const options2 = {"tank":["war","pld","drk","gnb"],
                        "healer":["sge","whm","sch","ast"],
                        "melee":["sam","nin","rpr","drg","mnk"],
                        "ranged":["dnc","brd","mch"],
                        "caster":["rdm","smn","blm"]}

    const [modal, setModal] = useState(false);
    const [roles, setRoles] = useState([]);
    const [logs, setLogs] = useState([]);
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

        props.parentCallback({role: roles, logs:document.getElementById("logs").value})
        setRoles([])
        toggleModal()
    }

      return (
        <>
          <button type="button" onClick={toggleModal} className="btn-modal">Add Member</button>
    
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <button className="close-modal" onClick={toggleModal}> CLOSE</button>
                <h2>Select Role</h2>
                <p>Only add one member at a time. For example, if you need a tank and a healer, select a tank first,
                    click "Add Role" at the bottom of this page, then select the "Add Role Needed" button again to add the healer.
                    One "role" can be multiple jobs. If you need a tank OR a healer, select both tank and healer on this page, and it will
                    show up as a Tank/Healer slot. If you need any tank except one, select all tanks except that one, but do not select "Tank (any)".
                </p>
                <div className="role-container">
                    {Object.keys(options2).map((item) =>
                        <div className={`role-group ${item}`}>
                            <FormControlLabel className="role-title" disabled={control.item} key={item} control={<Switch value={item} checked={checked.item} onChange={handleChange}/>} label={`${item.charAt(0).toUpperCase() + item.slice(1)} (ANY)`} labelPlacement="start"/>
                            {options2[item].map((item2) => 
                                <FormControlLabel disabled={control[item2]} key={item2} control={<Switch value={item2} checked={checked.item2} onChange={handleChange}/>} label={item2} labelPlacement="start"/> 
                            )}
                        </div>
                    )}
                </div>
                <label htmlFor="logs">Link member's logs (optional)</label>
                <input type="text" id="logs" name="logs"/>
                <button onClick={submitRoles}>Confirm Roles</button>
              </div>
            </div>
          )}
          </>
      );
}

export default MemberSelect;
