import React, { useEffect, useState } from 'react';
import styles from "../../style/betterroleselect.module.css";
import { Switch, FormControlLabel } from '@mui/material';
import { style } from '@mui/system';
import graphTheoryFordFulkerson from 'graph-theory-ford-fulkerson';

const RoleSelect = (props) => {

    const [roles, setRoles] = useState(props.roles);

    useEffect(() => {
        console.log(roles)
    })

    const toggle = (job) => {
        if (roles.includes(job)){
            let temproles = roles.filter(e => e !== job)
            setRoles(temproles)
            props.updateParent(temproles)
        } else {
            let temproles = roles.filter(e => e)
            temproles.push(job)
            roles.push(job)
            props.updateParent(temproles)
        }
    }

      return (
        <div style={{backgroundColor:"black"}}>
            <button onClick={props.onClose}>Close</button>
            <button onClick={() => {props.onClear();setRoles([])}}>Clear</button>
            <h1>Select Jobs</h1>
            <div className={styles.rolecontainer}>
                <div className={styles.dpscontainer}>
                    {['sam', 'nin', 'rpr', 'drg', 'mnk', 'rdm', 'blm', 'smn', 'mch', 'brd', 'dnc'].map((e) => {
                        return (
                            <FormControlLabel control={
                                <Switch checked={roles.includes(e)}onChange={() => {toggle(e)}}/>
                            } label={<span style={{color: "white"}}>{e.toUpperCase()}</span>}/>
                    )})}
                </div>
                <div className={styles.tankcontainer}>
                    {['pld', 'war', 'drk', 'gnb'].map((e) => {
                        return (
                            <FormControlLabel control={
                                <Switch checked={roles.includes(e)}onChange={() => {toggle(e)}}/>
                            } label={<span style={{color: "white"}}>{e.toUpperCase()}</span>}/>
                    )})}
                </div>
                <div className={styles.healercontainer}>
                    {['whm', 'sch', 'ast', 'sge'].map((e) => {
                        return (
                            <FormControlLabel control={
                                <Switch checked={roles.includes(e)}onChange={() => {toggle(e)}}/>
                            } label={<span style={{color: "white"}}>{e.toUpperCase()}</span>}/>
                    )})}
                </div>
            </div>
        </div>
      );
}

export default RoleSelect