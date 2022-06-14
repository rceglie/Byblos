import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Radio,
    FormControlLabel,
    Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import RoleSelect from "./RoleSelect.js";
import TimeSelect from "./TimeSelect.js";
import MemberSelect from "./MemberSelect.js";
import "../../style/createpost.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { getImage } from "./getImage.js";
import fflogsPic from "../../images/fflogs.jpg";

const CreatePost = () => {
    const [postData, setPostData] = useState({
        fight: "",
        times: {
            suns: -1,
            mons: -1,
            tues: -1,
            weds: -1,
            thurs: -1,
            fris: -1,
            sats: -1,
            sune: -1,
            mone: -1,
            tuee: -1,
            wede: -1,
            thure: -1,
            frie: -1,
            sate: -1,
        },
        prog: "",
        roles: [],
        comp: [],
        ilvl: "",
        exp: "",
        desc: "",
    });
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id === currentId) : null
    );
    const [timeDisplay, setTimeDisplay] = useState({suns:"", mons:"", tues: "", weds: "", thurs:"", fris:"", sats:"",sune:"", mone:"", tuee: "", wede: "", thure:"", frie:"", sate:""})
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    useEffect(() => {
        console.log("------ Use Effect ------");
        console.log("Post data:");
        console.log(postData);
        console.log("------ End Effect ------");
    });

    const handleSumbit = (e) => {
        console.log("scrap");
        e.preventDefault();
        setPostData(((prevState) => ({
            ...prevState,
            ilvl: document.getElementById("ilvl").value,
            desc: document.getElementById("desc").value,
        })));
        dispatch(
            createPost(
                { ...postData, name: user?.result?.name, creator: user?.result?._id },
                navigate
            )
        );
    };

    const handleRoleCallback = (childData) => {
        let newArr = postData.roles;
        newArr.push(childData);
        setPostData((prevState) => ({ ...prevState, roles: newArr }));
    };

    const handleMemberCallback = (childData) => {
        let newArr = postData.comp;
        newArr.push(childData);
        setPostData((prevState) => ({ ...prevState, comp: newArr }));
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

    const deleteSlot = (e) => {
        let newArr = postData.roles.map((x) => x);
        newArr.splice(e, 1);
        setPostData({ ...postData, roles: newArr });
    };

    const deleteMemberSlot = (e) => {
        let newArr = postData.comp.map((x) => x);
        newArr.splice(e, 1);
        setPostData({ ...postData, comp: newArr });
    };

    if (!user?.result?.name) {
        return (
            <div className="no-user">
                <h1 className="signheader">Sign in to create a LFM post</h1>
                <Button component={Link} to="/auth" variant="contained" color="primary" className="signbtn">Sign In</Button>
            </div>
        );
    }

    return (
        <div className="create-LFM border">
            <h3 className="lfm-title">
                {" "}
                {currentId ? "Editing a Post" : "Create a Post"}
            </h3>
            <div className="fight-prog-wrapper">
                <div className="fight-wrapper">
                <input
                    type="radio"
                    name="fightsel"
                    id="option-1"
                    value="UWU"
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            fight: e.target.value,
                            prog: "unselected",
                        })
                    }
                />
                <input
                    type="radio"
                    name="fightsel"
                    id="option-2"
                    value="UCOB"
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            fight: e.target.value,
                            prog: "unselected",
                        })
                    }
                />
                <input
                    type="radio"
                    name="fightsel"
                    id="option-3"
                    value="TEA"
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            fight: e.target.value,
                            prog: "unselected",
                        })
                    }
                />
                <input
                    type="radio"
                    name="fightsel"
                    id="option-4"
                    value="DSU"
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            fight: e.target.value,
                            prog: "unselected",
                        })
                    }
                />
                <label htmlFor="option-1" className="option option-1">
                    <span>UWU</span>
                </label>
                <label htmlFor="option-2" className="option option-2">
                    <span>UCOB</span>
                </label>
                <label htmlFor="option-3" className="option option-3">
                    <span>TEA</span>
                </label>
                <label htmlFor="option-4" className="option option-4">
                    <span>DSU</span>
                </label>
                </div>
                <div className="prog-wrapper">
                <label htmlFor="select-prog">Choose Prog Point:</label>
                <select id="select-prog"
                    onChange={(e) => setPostData({ ...postData, prog: e.target.value })}
                >
                    <option value="unselected">
                        {postData.fight != ""
                            ? "Select Prog Point"
                            : "Select Fight Before Setting Prog Point"}
                    </option>
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
            </div>
            <div className="times-wrapper border">
                <h3>Times</h3>
                <div className="timedisplay2">
                    <table className="timedisplaycreate">
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
                </div>
                <TimeSelect
                    times={postData.times}
                    parentCallback={handleTimeCallback}
                />
            </div>
            <div className="roles-needed-wrapper border">
                <h3>Roles Needed</h3>
                {postData.roles.map((mem, index) => (
                    <div className="slot">
                        <div className="slot-header">
                            <p>Slot {postData.roles.indexOf(mem) + 1}</p>
                            <div className="slot-buttons">
                                <Button onClick={() => deleteSlot(index)}>
                                    <DeleteIcon />
                                </Button>
                            </div>
                        </div>
                        <div className="slot-content">
                            {mem.map((job) => {
                                return (
                                    <div className="singleRole">
                                        <img className="roleImage" src={getImage(job)} />
                                        {mem.indexOf(job) != mem.length - 1 ? <h1>/</h1> : <p></p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                <RoleSelect parentCallback={handleRoleCallback} />
            </div>
            <div className="comp-wrapper border">
                <h3>Current Roster</h3>
                {postData.comp.map((mem, index) => (
                    <div className="slot">
                        <div className="slot-header">
                            <p>Slot {index + 1}</p>
                            <div className="slot-buttons">
                                <Button onClick={() => deleteMemberSlot(index)}>
                                    <DeleteIcon />
                                </Button>
                            </div>
                        </div>
                        <div className="slot-content">
                            {mem.role.map((job) => {
                                return (
                                    <div className="singleRole">
                                        <img className="roleImage" src={getImage(job)} />
                                        {mem.role.indexOf(job) != mem.role.length - 1 ? (
                                            <h1>/</h1>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                );
                            })}
                            <div>
                                <a href={mem.logs}>
                                    <img alt="FFLOGS" src={fflogsPic} width="50" height="50" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
                <MemberSelect parentCallback={handleMemberCallback} />
            </div>
            <div className="exp-ilvl-wrapper border">
                <div className="exp-wrapper">
                    <label htmlFor="exp-sel">Preferred Experience Level</label>
                    <select id="exp-sel" className="exp-sel" onChange={(e) => setPostData({ ...postData, exp: e.target.value })}>
                        <option value="unselected">Select Experience Level</option>
                        <>
                            <option>First Ultimate Experience</option>
                            <option>Some Past Ultimate Prog</option>
                            <option>One Ultimate Clear</option>
                            <option>Double Legend</option>
                            <option>Triple Legend</option>
                        </>
                    </select>
                </div>
                <div className="ilvl-wrapper">
                    <span>Item Level</span>
                    
                    <input type="number" id="ilvl" name="ilvl" max="600" />
                </div>
            </div>
            <div className="desc-wrapper">
                <label htmlFor="desc">Additional Information</label>
                <textarea id="desc" name="desc"></textarea>
            </div>
            <button className="submit addbtn" onClick={handleSumbit}>Create Post</button>
        </div>
    );
};

export default CreatePost;
