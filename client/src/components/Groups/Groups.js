import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "./groups.css"
import "reactjs-popup/dist/index.css"
import styles from './groups.module.css'

import * as api from '../../api';
import {auth} from '../../actions/auth.js'

import Post from './Post.js';
import Popup from 'reactjs-popup';
import ScheduleSelector from 'react-schedule-selector'
import {TextField, Button, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import RoleSelect from "../Util/RoleSelect";

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
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("profile"));

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
        borderColor:'white',
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
        },
        '&:hover': {
            borderColor: 'white',
        },
        ':hover': {
            borderColor: 'white',
        }
    }

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }

      const images = importAll(require.context('../../images/JobIcons', false, /\.(png|jpe?g|svg)$/));

    return (
        <div className="groups-wrapper">
            <span className="filter-groups-label">Filter Groups</span>
            <div className="filter-area" style={{"backgroundColor":"transparent", "overflowY":"auto", height:"60vh"}}>

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
                                <MenuItem value={e} key={e}>{e}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                {/* prog */}
                <FormControl>
                    <InputLabel style={{color:"white", textAlign: "left"}}>Prog Point</InputLabel>
                    <Select
                    sx={theme}
                    variant="outlined"
                    label="Prog Point"
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
                                <MenuItem value={e} key={e}>{e}</MenuItem>
                            )
                        })}
                        <MenuItem value="ANY" key="ANY">ANY</MenuItem>
                    </Select>
                </FormControl>

                {/* exp */}
                <FormControl fullWidth>
                    <InputLabel style={{color:"white", textAlign: "left"}}>Experience</InputLabel>
                    <Select
                    sx={theme}
                    variant="outlined"
                    label="Experience"
                    defaultValue="ANY"
                    onChange={(e) => setFilter({...filter, exp: e.target.value})}
                    >
                        {['First Ultimate', 'Some Ultimate Experience', 'Triple Legend', 'ANY'].map((e) => {
                            return (
                                <MenuItem value={e} key={e}>{e}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                {/* ilvl */}
                <FormControl fullWidth>
                    <TextField label="Item Level" variant="outlined" type="number" 
                        sx={theme}
                        inputProps={{style: {color: "white"}}}
                        InputLabelProps={{style: {color:"white", textAlign: "left"}}}
                        onChange={(e) => setFilter({ ...filter, ilvl: e.target.value })}
                        />
                </FormControl>

                {/* times */}
                <div className="times">
                    <Popup trigger={
                        <Button variant="outlined" style={{width:"100%", height: "5.5vh"}} sx={theme}>
                            Times: {filter.times.length == 0 ? "All" : "Custom Times"}
                        </Button>
                    } position="center" modal
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

                {/* jobs */}
                <div className='jobs'>
                    <InputLabel sx={theme} style={{textAlign: "left"}}></InputLabel>
                    <Popup trigger={
                        <Button variant="outlined" sx={theme} style={{width:"100%", height:"5.5vh", overflowX:"clip"}}>Jobs:&nbsp;
                            {filter.roles.length == 0 ? " All" :
                                filter.roles.length > 5 ? 
                                    <>
                                    {
                                    filter.roles.slice(0, 5).map((job) => {
                                        return (<img style={{height:"3vh"}} src={images[`${job}.png`]}/>)
                                    })
                                    }
                                    <p>&nbsp;...</p>
                                    </>
                                :
                                    filter.roles.map((job) => {
                                        console.log(images)
                                        return (<img style={{height:"3vh"}} src={images[`${job}.png`]}/>)
                                    })
                                
                            }
                        </Button>} position="center" modal
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

            <div className="sumbit-buttons" style={{top:"83vh", left:"3.66vw", gap:"2vh", position: "fixed", display:"flex", flexDirection:"column"}}>
                <Button variant="outlined" sx={theme} style={{
                    width:"100%", height:"5.5vh", width: "22.5vw"}}
                    onClick={async () => {
                        const result = await auth();
                        if (result) {
                            console.log("doing stuff")
                        } else {
                            navigate("/signin")
                        }
                    }}>
                    Fill with My Information
                </Button>
                <Button variant="outlined" sx={theme} style={{
                    width:"100%", height:"5.5vh", width: "22.5vw"}}
                    onClick={handleSumbit}>
                    Sort with Filter
                </Button>
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