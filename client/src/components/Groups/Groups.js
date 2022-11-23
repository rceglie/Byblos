import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./groups.css"
import "reactjs-popup/dist/index.css"
import styles from './groups.module.css'

import * as api from '../../api';
import {progmapping} from '../../actions/progmapping.js'

import Post from './Post.js';
import BetterTimeSelect from "../Util/BetterTimeSelect";
import BetterRoleSelect from "../Util/BetterRoleSelect";
import FilterTimeSelect from './FilterTimeSelect';
import Popup from 'reactjs-popup';
import ScheduleSelector from 'react-schedule-selector'
import Modal from '@mui/material/Modal'
import { ListItem, ListItemText, List, Drawer, DrawerHeader, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";

const Groups = () => {
    const [filter, setFilter] = useState({
        fight: "ANY",
        times: [],
        prog: "ANY",
        roles: [],
        ilvl: "ANY",
        exp: "ANY"
    });
    const [groups, setGroups] = useState([]);
    const [timesModal, setTimesModal] = useState(false)
    const [fightOpen, setFightOpen] = useState(false)

    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("------ Use Effect ------");
        console.log("Post data:");
        console.log(filter);
        console.log("Groups:");
        console.log(groups);
        console.log("------ End Effect ------");
    });

    const handleSumbit = async (e) => {
        e.preventDefault();
        const { data } = await api.fetchGroups(filter);
        setGroups(data.data);
    };

    const handleRoleCallback = (childData) => {
        setFilter((prevState) => ({ ...prevState, roles: childData }));
    };

    const handleTimeCallback = (childData) => {
        console.log("callback:", childData)
        setFilter((prevState) => ({ ...prevState, times: childData }));
    };

    const handleCollapse = (e) => {
        var content = e.target.nextElementSibling;
        closeMenus(content.className)
        e.target.classList.toggle("active")
        if (content.style.display == "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    const closeMenus = (avoid) => {
        const collection = document.getElementsByClassName("collapsible")
        for (let i = 0; i < collection.length; i++){
            try {
                if (collection[i].nextElementSibling.className != avoid){
                    collection[i].classList.remove("active");
                    collection[i].nextElementSibling.style.display = "none";
                }
            } catch (e) {console.log(e)}
        }
    }

    const renderCustomTimeCell = (time, selected, innerRef) => (
        <div style={{ textAlign: 'center'}} ref={innerRef}>
            <div style={{ height: '2.5vh', width: '100%', 'background-color': selected ? 'blue' : 'lightBlue'}}>
            </div>
        </div>
      )

    const renderCustomTimeLabel = (time, selected, innerRef) => (
        <div style={{ textAlign: 'center', color:'black'}} ref={innerRef}>{time.getHours()}
        </div>
      )

    Object.keys(progmapping).map((item) => console.log(item))

    return (
        <div className="groups-wrapper">
            <span className="filter-groups-label">Filter Groups</span>
            <div className="filter-area" style={{"backgroundColor":"white", "overflowY":"auto"}}>

                <FormLabel style={{color: "black", "fontSize": "3vh", "textAlign": "left"}}>Fight</FormLabel>
                <RadioGroup
                    defaultValue="Any"
                    onChange={(e) => {setFilter((prevState) => ({ ...prevState, fight: e.target.value }))}}
                    style={{color:"black", "marginLeft": "3vw"}}
                >
                    <FormControlLabel value="UWU" control={<Radio/>} label="UWU" />
                    <FormControlLabel value="UCOB" control={<Radio/>} label="UCOB" />
                    <FormControlLabel value="TEA" control={<Radio/>} label="TEA" />
                    <FormControlLabel value="DSU" control={<Radio/>} label="DSU" />
                    <FormControlLabel value="Any" control={<Radio/>} label="Any" />
                </RadioGroup>

                {/* <button className="collapsible" onClick={handleCollapse}>Fight</button>
                <div className="fight-content">
                    <input type="radio" id="UWU" name="fight" value="UWU" onChange={(e) => {setFilter((prevState) => ({ ...prevState, fight: e.target.value }))}}></input>
                    <label for="UWU">UWU</label>
                    <input type="radio" id="UCOB" name="fight" value="UCOB" onChange={(e) => {setFilter((prevState) => ({ ...prevState, fight: e.target.value }))}}></input>
                    <label for="UCOB">UCOB</label>
                    <input type="radio" id="TEA" name="fight" value="TEA" onChange={(e) => {setFilter((prevState) => ({ ...prevState, fight: e.target.value }))}}></input>
                    <label for="TEA">TEA</label>
                    <input type="radio" id="DSU" name="fight" value="DSU" onChange={(e) => {setFilter((prevState) => ({ ...prevState, fight: e.target.value }))}}></input>
                    <label for="DSU">DSU</label>
                    <input type="radio" id="ANY" default name="fight" value="ANY" onChange={(e) => {setFilter((prevState) => ({ ...prevState, fight: e.target.value }))}}></input>
                    <label for="ANY">ANY</label>
                </div> */}

                <FormLabel style={{color: "black", "fontSize": "3vh", "textAlign": "left"}}>Minimum Prog Point</FormLabel>
                <RadioGroup
                    defaultValue="Any"
                    onChange={(e) => {setFilter((prevState) => ({ ...prevState, prog: e.target.value }))}}
                    style={{color:"black", "marginLeft": "3vw"}}
                >
                    <>
                    {Object.keys(progmapping).map((item) => { <>
                        <FormLabel>{item}</FormLabel>
                        <FormControlLabel value={item} control={<Radio/>} label={`${item}`} /></>
                    })}
                    </>
                </RadioGroup>

                <button className="collapsible" onClick={handleCollapse}>Prog</button>
                <div className="prog-content">
                    <select id="select-prog" onChange={(e) =>
                        setFilter({ ...filter, prog: e.target.value })}>
                        <option value="ANY">Any</option>
                        {filter.fight == "ANY" && (
                            <>
                                <option disabled>Select Fight to Select Prog Point</option>
                            </>
                        )}
                        {filter.fight == "UWU" && (
                            <>
                                <option>Fresh</option>
                                <option>Garuda</option>
                                <option>Ifrit</option>
                                <option>Titan</option>
                                <option>Predation</option>
                                <option>Annihilation</option>
                                <option>Suppression</option>
                                <option>Primal Roulette</option>
                            </>
                        )}
                        {filter.fight == "UCOB" && (
                            <>
                                <option>Fresh</option>
                                <option>Twin</option>
                                <option>Nael</option>
                                <option>Quickmarch/Blackfire/Fellruin</option>
                                <option>Heavensfall</option>
                                <option>Tenstrike/Octet</option>
                                <option>Adds</option>
                                <option>Golden</option>
                            </>
                        )}
                        {filter.fight == "TEA" && (
                            <>
                                <option>Fresh</option>
                                <option>Living Liquid</option>
                                <option>Brute Justice + Cruise Chaser</option>
                                <option>Inception</option>
                                <option>Wormhole</option>
                                <option>Perfect Alexander</option>
                            </>
                        )}
                        {filter.fight == "DSU" && (
                            <>
                                <option>Fresh</option>
                                <option>Vault</option>
                                <option>Thordan 1</option>
                                <option>Nidstinien</option>
                                <option>Eyes</option>
                                <option>Thordan 2</option>
                                <option>Double Dragons</option>
                                <option>Dragon King</option>
                            </>
                        )}
                    </select>
                </div>

                <button className="collapsible" onClick={handleCollapse}>Minimum Raiding Experience</button>
                <div className="exp-content">
                    <select id="exp-sel" className="exp-sel" onChange={(e) => setFilter({ ...filter, exp: e.target.value })}>
                        <option value="ANY">Any</option>
                        <option>First Ultimate Experience</option>
                        <option>Some Past Ultimate Prog</option>
                        <option>One Ultimate Clear</option>
                        <option>Double Legend</option>
                        <option>Triple Legend</option>
                    </select>
                </div> 

                <button className="collapsible" onClick={handleCollapse}>Item Level</button>
                <div className="ilvl-content">
                    <input type="number" id="ilvl" name="ilvl" min="0" max="600" onChange={(e) => setFilter({ ...filter, ilvl: e.target.value })}/>
                </div>

                <div className="times">
                    <Popup trigger={<button>Open modal</button>} position="center" modal
                        contentStyle={{
                            width: "50vw", border: "#673FD7 10px inset",
                            "border-radius": "5%"
                            }}>
                        {close => (
                            <div>
                                <button onClick={close}>close</button>
                                <ScheduleSelector
                                    selection={filter.times}
                                    onChange={(e) => {setFilter({...filter, times:e})}}
                                    rowGap={".25vh"}
                                    renderDateCell={renderCustomTimeCell}
                                    numDays={7}
                                    minTime={0}
                                    maxTime={24}
                                    hourlyChunks={1}
                                    dateFormat={"ddd"}
                                    timeFormat={"hh:mm A"}
                                    startDate={"11-20-22"}
                                    columnGap={".5vw"}
                                />
                                <button onClick={() => setFilter({...filter, times:[]})}>clear</button>
                            </div>
                        )}
                        {/* <FilterTimeSelect times={filter.times} parentCallback={handleTimeCallback}/> */}
                    </Popup>
                </div>

                <div className='jobs'>
                    <BetterRoleSelect label={"Jobs"} roles={filter.roles} parentCallback={handleRoleCallback} />
                </div>

                <div className="sumbit-buttons">
                    <button className="submit-search" onClick={handleSumbit}>Sort with My Information</button>
                    <button className="submit-search" onClick={handleSumbit}>Sort with Filter</button>
                </div>
            </div>
            <span className="display-groups-label">Groups</span>
            <div className="group-area">
                {groups?.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Groups;