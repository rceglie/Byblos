import React, { useEffect, useState } from 'react';
import styles from "../../style/betterroleselect.module.css";
import { Switch, FormControlLabel } from '@mui/material';
import { style } from '@mui/system';

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
        setRoles({...roles, dps:true})
        if (!modal){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setModal(!modal)
    };

    useEffect(() => {
        console.log(roles)
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
                <div className={styles.rolecontainer}>
                    <div className={styles.dpscontainer}>
                        <div className={styles.dpsheader}>
                            <FormControlLabel control={
                                <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                            } label={<span style={{color: "white"}}>All DPS</span>}/>
                        </div>
                        <div className={style.castercontainer}>
                            <div className={style.casterheader}>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>All Casters</span>}/>
                            </div>
                            <div className={style.casterbody}>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>RDM</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>BLM</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>SMN</span>}/>
                            </div>
                        </div>
                        <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>MCH</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>DNC</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>BRD</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>SAM</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>NIN</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>DRG</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>RPR</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>MNK</span>}/>
                    </div>
                    <div className={styles.tankcontainer}>
                    <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>PLD</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>WAR</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>GNB</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>DRK</span>}/>
                    </div>
                    <div className={styles.healercontainer}>
                    <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>WHM</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>SCH</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>AST</span>}/>
                                <FormControlLabel control={
                                    <Switch label={"All DPS"} checked={roles.dps} onChange={() => setRoles({ ...roles, dps: !roles.dps })}/>
                                } label={<span style={{color: "white"}}>SGE</span>}/>
                    </div>
                    {/* {Object.keys(options2).map((item) =>
                        <div className={`${styles.rolegroup} ${item}`}>
                            <FormControlLabel className={styles.roletitle} disabled={control.item} key={item} control={<Switch value={item} checked={checked.item} onChange={handleChange}/>} label={`${item.charAt(0).toUpperCase() + item.slice(1)} (ANY)`} labelPlacement="start"/>
                            {options2[item].map((item2) => 
                                <FormControlLabel disabled={control[item2]} key={item2} control={<Switch value={item2} checked={checked.item2} onChange={handleChange}/>} label={item2} labelPlacement="start"/> 
                            )}
                        </div>
                    )} */}
                </div>
                <button className={styles.confirmbutton} onClick={submitRoles}>Confirm Jobs</button>
              </div>
            </div>
          )}
          </>
      );
}

export default BetterRoleSelect;
