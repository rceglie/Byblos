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
            suns: "",
            mons: "",
            tues: "",
            weds: "",
            thurs: "",
            fris: "",
            sats: "",
            sune: "",
            mone: "",
            tuee: "",
            wede: "",
            thure: "",
            frie: "",
            sate: "",
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
        setPostData((prevState) => ({
            ...prevState,
            ilvl: document.getElementById("ilvl").value,
            desc: document.getElementById("desc").value,
        }));
        // if(currentId == 0) {
        dispatch(
            createPost(
                { ...postData, name: user?.result?.name, creator: user?.result?._id },
                navigate
            )
        );
        // } else {
        //     dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        // }
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
        // If end time < start time, convert end time to 36 hour time
        // 1. Get every end date and check it with its start data
        console.log("child data:");
        console.log(childData);
        let allKeys = Object.keys(childData);
        for (let i = 0; i < allKeys.length; i++) {
            if (allKeys[i].slice(-1) == "s" && childData[allKeys[i]] != null) {
                let endKey = allKeys[i].replace(/.$/, "e");
                let endTime = childData[endKey];
                let startTime = childData[allKeys[i]];
                console.log("Start time", startTime);
                console.log("End time", endTime);
                var startMinutes =
                    parseInt(startTime.split(":")[1], 10) +
                    parseInt(startTime.split(":")[0], 10) * 60;
                var endMinutes =
                    parseInt(endTime.split(":")[1], 10) +
                    parseInt(endTime.split(":")[0], 10) * 60;
                if (endMinutes < startMinutes) {
                    console.log("need to convert");
                    console.log(parseInt(endTime.split(":")[0], 10) + 24);
                    childData[endKey] =
                        (parseInt(endTime.split(":")[0], 10) + 24).toString() +
                        ":" +
                        endTime.split(":")[1];
                    console.log(childData);
                }
            }
        }
        setPostData((prevState) => ({ ...prevState, times: childData }));
    };

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

    const convertDateToString = (d) => {
        let startTime = postData.times[d.concat("s")]
        let endTime = postData.times[d.concat("e")]
        let sp = ""
        let ep = ""
        if (parseInt(startTime.split(":")[0], 10) > 12){
            sp = " PM"
        } else {
            sp = " AM"
        }
        if (parseInt(endTime.split(":")[0], 10) > 12){
            ep = " PM"
        } else {
            ep = " AM"
        }
        if (parseInt(endTime.split(":")[0], 10) >= 24){
            endTime = (parseInt(endTime.split(":")[0], 10) - 24).toString() + ":" + endTime.split(":")[1]
        } else if (parseInt(endTime.split(":")[0], 10) > 12){
            endTime = (parseInt(endTime.split(":")[0], 10) - 12).toString() + ":" + endTime.split(":")[1]
        }
        if (parseInt(startTime.split(":")[0], 10) > 12){
            startTime = (parseInt(startTime.split(":")[0], 10) - 12).toString() + ":" + startTime.split(":")[1]
        }
        return startTime.concat(sp).concat(" - ").concat(endTime).concat(ep)
    }

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
            <div className="times-wrapper">
                <h3>Times</h3>
                {postData.times["suns"] != "" ? <p>   Sunday: {"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}{convertDateToString("sun")}</p> : ""}
                {postData.times["mons"] != "" ? <p>   Monday: {"\xa0\xa0\xa0\xa0\xa0\xa0"}{convertDateToString("mon")}</p> : ""}
                {postData.times["tues"] != "" ? <p>  Tuesday: {"\xa0\xa0\xa0\xa0\xa0\xa0"}{convertDateToString("tue")}</p> : ""}
                {postData.times["weds"] != "" ? <p>Wednesday: {"\xa0"}{convertDateToString("wed")}</p> : ""}
                {postData.times["thurs"] != "" ? <p>Thursday: {"\xa0\xa0\xa0\xa0"}{convertDateToString("thur")}</p> : ""}
                {postData.times["fris"] != "" ? <p>   Friday: {"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}{convertDateToString("fri")}</p> : ""}
                {postData.times["sats"] != "" ? <p> Saturday: {"\xa0\xa0\xa0\xa0\xa0"}{convertDateToString("sat")}</p> : ""}
                <TimeSelect
                    times={postData.times}
                    parentCallback={handleTimeCallback}
                />
            </div>
            <div className="roles-needed-wrapper">
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
            <div className="comp-wrapper">
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
            <div className="other-wrapper">
                <div className="exp-wrapper">
                    <label htmlFor="exp-sel">Preferred Experience Level</label>
                    <select id="exp-sel"
                        onChange={(e) => setPostData({ ...postData, exp: e.target.value })}
                    >
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
                    <label htmlFor="ilvl">Required Item Level</label>
                    <input type="number" id="ilvl" name="ilvl" max="600" />
                </div>
                <div className="desc-wrapper">
                    <label htmlFor="desc">Other Information</label>
                    <input type="text" id="desc" name="desc" />
                </div>
            </div>

            <button className="submit" onClick={handleSumbit}>Submit</button>
        </div>
    );
};

export default CreatePost;
