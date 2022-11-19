import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import SingleRoleSelect from "./SingleRoleSelect.js";
import TimeSelect from "../CreatePost/TimeSelect.js";
import "../../style/testgroups.css";
import { getImage } from "../CreatePost/getImage";
import { applyMiddleware } from "redux";
import * as api from '../../api';
import Post from './Post.js';

const Groups = () => {
    const [postData, setPostData] = useState({
        fight: "ANY",
        times: {suns:-1, mons:-1, tues: -1, weds: -1, thurs:-1, fris:-1, sats:-1,sune:-1, mone:-1, tuee: -1, wede: -1, thure:-1, frie:-1, sate:-1},
        prog: "ANY",
        roles: [],
        ilvl: "ANY",
        exp: "ANY"
    });
    const [groups, setGroups] = useState([]);
    const [timeDisplay, setTimeDisplay] = useState({suns:"", mons:"", tues: "", weds: "", thurs:"", fris:"", sats:"",sune:"", mone:"", tuee: "", wede: "", thure:"", frie:"", sate:""})
    const [ignore, setIgnore] = useState({fight: false, times: false, prog: false, roles: false, ilvl: false, exp: false});
    
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("------ Use Effect ------");
        console.log("Post data:");
        console.log(postData);
        console.log("Groups:");
        console.log(groups);
        console.log("------ End Effect ------");
    });

    const handleSumbit = async (e) => {
        e.preventDefault();
        const { data } = await api.fetchGroups(postData);
        setGroups(data.data);
    };

    const handleRoleCallback = (childData) => {
        setPostData((prevState) => ({ ...prevState, roles: childData }));
    };

    const handleTimeCallback = (childData) => {
        console.log(childData)
        convertDateToString(childData)
        setPostData((prevState) => ({ ...prevState, times: childData }));
    };

    const convertDateToString = (d) => {
        console.log(d)
        let tempStrings = {suns:"", mons:"", tues: "", weds: "", thurs:"", fris:"", sats:"",sune:"", mone:"", tuee: "", wede: "", thure:"", frie:"", sate:""}
        let allKeys = Object.keys(tempStrings);
        for (let i = 0; i < 7; i++) {
            console.log(allKeys[i])
            console.log(d[allKeys[i]])
            if (d[allKeys[i]] != -1) { // If key has data
                let startKey = allKeys[i]
                let endKey = allKeys[i].replace(/.$/, "e");
                let startTime = d[startKey]
                let endTime = d[endKey] > 1440 ? d[endKey] - 1440 : d[endKey]; // Converts to 24 hour time if greater than 1440 (24 hr)
                console.log(endTime)

                // For start time
                let hour = Math.floor(startTime / 60)
                let minute = startTime % 60
                let suffix = "AM"
                if (hour > 12){
                    hour = hour - 12
                    suffix = "PM"
                } else if (hour == 0){
                    hour = 12
                }
                let strHour = hour < 10 ? "0".concat(hour) : "".concat(hour)
                let strMin = minute < 10 ? "0".concat(minute) : "".concat(minute)
                tempStrings[startKey] = "".concat(strHour).concat(":").concat(strMin).concat(" ").concat(suffix)

                // For end time
                hour = Math.floor(endTime / 60)
                minute = endTime % 60
                //console.log(hour, minute)
                suffix = "AM"
                if (hour > 12){
                    hour = hour - 12
                    suffix = "PM"
                } else if (hour == 0){
                    hour = 12
                }
                strHour = hour < 10 ? "0".concat(hour) : "".concat(hour)
                strMin = minute < 10 ? "0".concat(minute) : "".concat(minute)
                tempStrings[endKey] = "".concat(strHour).concat(":").concat(strMin).concat(" ").concat(suffix)
            }
        }

        console.log("Temp Strings:")
        console.log(tempStrings)
        setTimeDisplay(tempStrings)
        
        return 0
    }

    return (

        <div>
            <div>
                <div className="fight">
                    <select defaultValue="ANY" onChange={(e) =>
                        setPostData({
                            ...postData,
                            fight: e.target.value
                        })}>
                        <option value="UWU">UWU</option>
                        <option value="UCOB">UCOB</option>
                        <option value="TEA">TEA</option>
                        <option value="DSU">DSU</option>
                        <option value="ANY">Any</option>
                    </select>
                </div>

                <div className="prog">
                    <select id="select-prog" onChange={(e) =>
                        setPostData({ ...postData, prog: e.target.value })}>
                        <option value="ANY">Any</option>
                        {postData.fight == "ANY" && (
                            <>
                                <option disabled>Select Fight to Select Prog Point</option>
                            </>
                        )}
                        {postData.fight == "UWU" && (
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
                        {postData.fight == "UCOB" && (
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
                        {postData.fight == "TEA" && (
                            <>
                                <option>Fresh</option>
                                <option>Living Liquid</option>
                                <option>Brute Justice + Cruise Chaser</option>
                                <option>Inception</option>
                                <option>Wormhole</option>
                                <option>Perfect Alexander</option>
                            </>
                        )}
                        {postData.fight == "DSU" && (
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

                <div className="exp">
                    <select id="exp-sel" className="exp-sel" onChange={(e) => setPostData({ ...postData, exp: e.target.value })}>
                        <option value="ANY">Any</option>
                        <option>First Ultimate Experience</option>
                        <option>Some Past Ultimate Prog</option>
                        <option>One Ultimate Clear</option>
                        <option>Double Legend</option>
                        <option>Triple Legend</option>
                    </select>
                </div> 

                <div className="ilvl">
                    <input type="number" id="ilvl" name="ilvl" min="0" max="600" onChange={(e) => console.log(e.target.value)}/>
                </div>

                <div className="times">
                    <TimeSelect
                            times={postData.times}
                            parentCallback={handleTimeCallback}
                        />
                </div>

                <div className='jobs'>
                    <SingleRoleSelect parentCallback={handleRoleCallback} />
                </div>

                <div className="sumbit-buttons">
                    <button className="submit-search addbtn" onClick={handleSumbit}>Load Saved Filter</button>
                    <button className="submit-search addbtn" onClick={handleSumbit}>Set as Saved Filter</button>
                    <button className="submit-search addbtn" onClick={handleSumbit}>Sort</button>
                </div>
            </div>
            <div>
                {groups?.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Groups;