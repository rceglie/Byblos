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
import {RadioGroup, FormControlLabel, Radio, FormLabel, TextField, Button, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import RoleSelect from "../Util/RoleSelect";
import { createTheme } from "@mui/system";

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
        console.log("fight:", filter.fight)
        console.log("roles:", filter.roles)
        console.log("object:", filter);
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
            } catch (e) {}
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

    const theme = {
        color: "white",
        '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
        },
        '.MuiSvgIcon-root ': {
        fill: "white !important",
        }
    }

    return (
        <div className="groups-wrapper">
            <span className="filter-groups-label">Filter Groups</span>
            <div className="filter-area" style={{"backgroundColor":"transparent", "overflowY":"auto"}}>

                {/* fight */}
                <FormControl fullWidth style={{color: "white"}}>
                    <InputLabel style={{ color:"white", textAlign: "left"}}>Fight</InputLabel>
                    <Select
                    style={{borderColor: "white", color: "white"}}
                    variant="outlined"
                    label="Fight"
                    defaultValue="ANY"
                    sx={theme}
                    onChange={(e) => setFilter({...filter, fight: e.target.value})}
                    >
                        {['UWU', 'UCOB', 'TEA', 'DSU', 'ANY'].map((e) => {
                            return (
                                <MenuItem value={e}>{e}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel style={{color:"white", textAlign: "left"}}>Minimum Prog Point</InputLabel>
                    <Select
                    sx={theme}
                    variant="outlined"
                    label="Minimum Prog Point"
                    defaultValue="ANY"
                    onChange={(e) => setFilter({...filter, prog: e.target.value})}
                    >
                        {
                        {"ANY": [],
                        "UWU": ["garuda", "ifrit", "titan"],
                        "UCOB": ["twin", "nael", "blackfire"],
                        "TEA": ["living liquid", "bjcc", "inception"],
                        "DSU": ["vault", "nidhogg", "double dragons"],
                        }[filter.fight].map((e) => {
                            return (
                                <MenuItem value={e}>{e}</MenuItem>
                            )
                        })}
                        <MenuItem value="ANY">ANY</MenuItem>
                    </Select>
                </FormControl>

                {/* <button className="collapsible" onClick={handleCollapse}>Prog</button>
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
                </div> */}

                {/* exp */}
                <FormControl fullWidth>
                    <InputLabel style={{color:"white", textAlign: "left"}}>Raiding Experience</InputLabel>
                    <Select
                    sx={theme}
                    variant="outlined"
                    label="Raiding Experience"
                    defaultValue="ANY"
                    onChange={(e) => setFilter({...filter, exp: e.target.value})}
                    >
                        {['First Ultimate', 'Some Ultimate Experience', 'Triple Legend', 'ANY'].map((e) => {
                            return (
                                <MenuItem value={e}>{e}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                {/* ilvl */}
                <FormControl fullWidth>
                    <TextField label="Minimum Item Level" variant="outlined" type="number" 
                        sx={theme}
                        inputProps={{style: {color: "white"}}}
                        InputLabelProps={{style: {color:"white"}}}
                        onChange={(e) => setFilter({ ...filter, ilvl: e.target.value })}
                        />
                </FormControl>


                <div className="times">
                    <Popup trigger={<Button variant="outlined">Select Times</Button>} position="center" modal
                        contentStyle={{
                            width: "50vw", border: "#673FD7 10px inset",
                            borderRadius: "5%"
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
                    <Popup trigger={<Button variant="outlined">Select Jobs</Button>} position="center" modal
                            contentStyle={{
                                width: "50vw", height: "80vh", border: "#673FD7 10px inset",
                                borderRadius: "5%"
                                }}>
                            {close => (
                                <RoleSelect
                                    roles={filter.roles}
                                    updateParent={(e) => {
                                        console.log(e)
                                        setFilter({...filter, roles:e})}}
                                    onClose={close}
                                    onClear={() => setFilter({...filter, roles:[]})}
                                />
                            )}
                        </Popup>
                    {/* <BetterRoleSelect label={"Jobs"} roles={filter.roles} parentCallback={handleRoleCallback} /> */}
                </div>
            </div>

            <div className="sumbit-buttons">
                    <button className="submit-search" onClick={handleSumbit}>Sort with My Information</button>
                    <button className="submit-search" onClick={handleSumbit}>Sort with Filter</button>
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