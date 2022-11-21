import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import BetterRoleSelect from "../Util/BetterRoleSelect";
import TimeSelect from "../CreatePost/TimeSelect.js";
import "../../style/testgroups.css";
import { getImage } from "../CreatePost/getImage";
import { applyMiddleware } from "redux";
import * as api from '../../api';
import Player from './Player';
import ScheduleSelector from "react-schedule-selector";
import BetterTimeSelect from "../Util/BetterTimeSelect";

const Players = () => {
    const [filter, setFilter] = useState({
        fight: "ANY",
        times: [],
        prog: "ANY",
        roles: [],
        ilvl: "ANY",
        exp: "ANY"
    });
    const [players, setPlayers] = useState([]);

    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("------ Use Effect ------");
        console.log("Filter:");
        console.log(filter);
        console.log("Players:");
        console.log(players);
        console.log("------ End Effect ------");
    });

    const handleSumbit = async (e) => {
        e.preventDefault();
        const { data } = await api.getPlayers(filter);
        console.log(data)
        setPlayers(data);
    };

    const handleRoleCallback = (childData) => {
        setFilter((prevState) => ({ ...prevState, roles: childData }));
    };

    const handleTimeCallback = (childData) => {
        console.log("callback:", childData)
        setFilter((prevState) => ({ ...prevState, times: childData }));
    };

    return (
        <div>
            <div>
                <div className="fight">
                    <select defaultValue="ANY" onChange={(e) => setFilter({...filter,fight: e.target.value})}>
                        <option value="UWU">UWU</option>
                        <option value="UCOB">UCOB</option>
                        <option value="TEA">TEA</option>
                        <option value="DSU">DSU</option>
                        <option value="ANY">Any</option>
                    </select>
                </div>

                <div className="prog">
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

                <div className="exp">
                    <select id="exp-sel" className="exp-sel" onChange={(e) => setFilter({ ...filter, exp: e.target.value })}>
                        <option value="ANY">Any</option>
                        <option>First Ultimate Experience</option>
                        <option>Some Past Ultimate Prog</option>
                        <option>One Ultimate Clear</option>
                        <option>Double Legend</option>
                        <option>Triple Legend</option>
                    </select>
                </div> 

                <div className="ilvl">
                    <input type="number" id="ilvl" name="ilvl" min="0" max="600" onChange={(e) => setFilter({ ...filter, ilvl: e.target.value })}/>
                </div>

                <div className="times">
                    <BetterTimeSelect times={filter.times} label={"Set Times Filter"} parentCallback={handleTimeCallback}/>
                </div>

                <div className='jobs'>
                    <BetterRoleSelect roles={filter.roles} parentCallback={handleRoleCallback} />
                </div>

                <div className="sumbit-buttons">
                    <button className="submit-search addbtn" onClick={handleSumbit}>Sort</button>
                </div>
            </div>
            <div>
                {players?.map((player, index) => (
                    <Player key={index} player={player} />
                ))}
            </div>
        </div>
    );
};

export default Players;