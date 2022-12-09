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
import BetterRoleSelect from "../Util/BetterRoleSelect";
import MemberSelect from "./MemberSelect.js";
import "../../style/createpost.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { getImage } from "./getImage.js";
import fflogsPic from "../../images/fflogs.jpg";
import { auth } from "../../actions/auth";
import Popup from 'reactjs-popup';
import ScheduleSelector from 'react-schedule-selector'

const CreatePost = () => {
    const [postData, setPostData] = useState({
        fight: "",
        times: [],
        prog: "",
        roles: [],
        comp: [],
        ilvl: "",
        exp: "",
        sum: "",
        desc: ""
    });
    const dispatch = useDispatch();
    const [user, setUser] = useState("")
    const navigate = useNavigate();


    // TEMPORARY: for now, if user == true, then logged in
    useEffect(() => {
        async function fetchData() {
          const result = await auth();
          if (result){
            setUser(result)
          } else {
            setUser(result);
          }
        }
        fetchData();
      }, [])

    const handleSumbit = (e) => {
        console.log("submitting");
        e.preventDefault();
        setPostData(((prevState) => ({
            ...prevState,
            sum: document.getElementById("sum").value,
            desc: document.getElementById("desc").value,
        })));
        dispatch(
            createPost(
                { ...postData, name: user?.result?.name, creator: JSON.parse(localStorage.getItem("user"))._id},
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

    function enforceMinMax(e) {
        if (e.target.value != "") {
          if (e.target.value < 1) {
            e.target.value = 1;
          } else if (e.target.value > 999) {
            e.target.value = 999;
          }
          setPostData({...postData, ilvl: e.target.value});
        }
      }

    if (!user) {
        return (
            <div className="no-user">
                <h1 className="signheader">Sign in to create a LFM post</h1>
                <Button component={Link} to="/signin" variant="contained" color="primary" className="signbtn">Sign In</Button>
            </div>
        );
    }

    const renderCustomTimeCell = (time, selected, innerRef) => (
        <div style={{ textAlign: 'center'}} ref={innerRef}>
            <div style={{ height: '2.5vh', width: '100%', 'background-color': selected ? 'blue' : 'lightBlue'}}>
            </div>
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

    return (
        <div className="create-LFM border">
            <h3 className="lfm-title">Create a Post</h3>
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
                <Popup trigger={
                    <Button variant="outlined" style={{width:"100%", height: "5.5vh"}} sx={theme}>
                        Set Times
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
                                    selection={postData.times}
                                    onChange={(e) => {setPostData({...postData, times:e})}}
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
                                <button onClick={() => setPostData({...postData, times:[]})}>clear</button>
                            </div>
                        )}
                        {/* <FilterTimeSelect times={filter.times} parentCallback={handleTimeCallback}/> */}
                    </Popup>
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
                <BetterRoleSelect parentCallback={handleRoleCallback} />
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
                    <input type="number" id="ilvl" name="ilvl" min="1" max="999" onKeyUp={(e) => enforceMinMax(e)}/>
                </div>
            </div>
            <div className="desc-wrapper">
                <label htmlFor="sum">Group Summary ({"<"} 500 char)</label>
                <textarea maxLength="500" id="sum" name="sum"></textarea>
                <label htmlFor="desc">Additional Information</label>
                <textarea id="desc" name="desc"></textarea>
            </div>
            <button className="submit addbtn" onClick={handleSumbit}>Create Post</button>
        </div>
    );
};

export default CreatePost;
