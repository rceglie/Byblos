import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import SingleRoleSelect from "./SingleRoleSelect.js";
import TimeSelect from "../CreatePost/TimeSelect.js";
import "../../style/testgroups.css";
import { getImage } from "../CreatePost/getImage";

const TestGroups = () => {
    const [postData, setPostData] = useState({
        fight: "ANY",
        times: {suns:-1, mons:-1, tues: -1, weds: -1, thurs:-1, fris:-1, sats:-1,sune:-1, mone:-1, tuee: -1, wede: -1, thure:-1, frie:-1, sate:-1},
        prog: "ANY",
        roles: [],
        ilvl: "ANY",
        exp: "ANY",
        ignore: {}
    });
    const dispatch = useDispatch();
    const [timeDisplay, setTimeDisplay] = useState({suns:"", mons:"", tues: "", weds: "", thurs:"", fris:"", sats:"",sune:"", mone:"", tuee: "", wede: "", thure:"", frie:"", sate:""})
    const [ignore, setIgnore] = useState({fight: false, times: false, prog: false, roles: false, ilvl: false, exp: false});
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();

    useEffect(() => {
        console.log("------ Use Effect ------");
        console.log("Post data:");
        console.log(postData);
        console.log("------ End Effect ------");
    });

    const handleSumbit = (e) => {
        e.preventDefault();
        setPostData((prevState) => ({
            ...prevState,
            ilvl: document.getElementById("ilvl").value
        }));
        dispatch(getPosts({ ...postData, ignore: ignore }, navigate));
        return 0
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
                            fight: e.target.value,
                            prog: "unselected",
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

            </div>

        <div className="LFG border">
            <div className="times-wrapper2 border">
                <h3>Times Available</h3>
                <div className="timedisplay">
                    <table>
                        {postData.times["suns"] != -1 ? <tr>
                            <td>Sun</td>
                            <td>{timeDisplay["suns"]} to {timeDisplay["sune"]}</td>
                        </tr> : ""}
                        {postData.times["mons"] != -1 ? <tr>
                            <td>Mon</td>
                            <td>{timeDisplay["mons"]} to {timeDisplay["mone"]}</td>
                        </tr> : ""}
                        {postData.times["tues"] != -1 ? <tr>
                            <td>Tues</td>
                            <td>{timeDisplay["tues"]} to {timeDisplay["tuee"]}</td>
                        </tr> : ""}
                        {postData.times["weds"] != -1 ? <tr>
                            <td>Wed</td>
                            <td>{timeDisplay["weds"]} to {timeDisplay["wede"]}</td>
                        </tr> : ""}
                        {postData.times["thurs"] != -1 ? <tr>
                            <td>Thur</td>
                            <td>{timeDisplay["thurs"]} to {timeDisplay["thure"]}</td>
                        </tr> : ""}
                        {postData.times["fris"] != -1 ? <tr>
                            <td>Fri</td>
                            <td>{timeDisplay["fris"]} to {timeDisplay["frie"]}</td>
                        </tr> : ""}
                        {postData.times["sats"] != -1 ? <tr>
                            <td>Sat</td>
                            <td>{timeDisplay["sats"]} to {timeDisplay["sate"]}</td>
                        </tr> : ""}
                    </table>
                    <TimeSelect
                        times={postData.times}
                        parentCallback={handleTimeCallback}
                    />
                </div>
                <input type="checkbox" id="timesignore" name="timesignore" value="false" onClick={() => setIgnore((prevState) => ({ ...prevState, times: !ignore.times }))}/> 
                <label id="timesignorelabel" className="ignorelabel" htmlFor="timesignore">Any</label>
            </div>
            <div className="roles-needed-wrapper2 border">
                <h3>Your Role(s)</h3>
                <div className="roles-content">
                    <div className="role-row">
                        {postData.roles.map((job, index) => {
                            return (
                                <div className="singleRole">
                                    <img className="roleImage" src={getImage(job)} />
                                </div>
                            );
                        })}
                    </div>
                    <SingleRoleSelect parentCallback={handleRoleCallback} />
                </div>
                <input type="checkbox" id="roleignore" name="roleignore" value="false" onClick={() => setIgnore((prevState) => ({ ...prevState, roles: !ignore.roles }))}/> 
                <label id="roleignorelabel" className="ignorelabel" htmlFor="roleignore">Any</label>
            </div>
            <div className="btns">
                <button className="submit-search addbtn" onClick={handleSumbit}>Load Saved Filter</button>
                <button className="submit-search addbtn" onClick={handleSumbit}>Set as Saved Filter</button>
                <button className="submit-search addbtn" onClick={handleSumbit}>Sort</button>
            </div>
        </div>
        </div>
    );
};

export default TestGroups;