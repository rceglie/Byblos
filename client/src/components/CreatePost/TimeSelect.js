import React, {useEffect, useState} from 'react';
import "../../style/timeselect.css";

const TimeSelect = (props) => {

    const [modal, setModal] = useState(false);
    const [times, setTimes] = useState(
        props.times != null ?
            props.times
            :
            {suns:-1, mons:-1, tues: -1, weds: -1, thurs:-1, fris:-1, sats:-1,sune:-1, mone:-1, tuee: -1, wede: -1, thure:-1, frie:-1, sate:-1}
    );

    useEffect(() => {
        console.log(times)
    })

    const toggleModal = () => {
        if (!modal){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setModal(!modal)
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const submitTimes = () => {
        validateTimes()
        props.parentCallback(times)
        toggleModal()
    }

    const handleChange = (e) => {
        console.log(e)
        setTimes({...times, [e.target.id]: e.target.value})
    }

    const validateTimes = () => {
        let days = Object.keys(times)
       
        for (let i = 0 ; i < 7; i++){
            console.log(times[days[i].slice(0, -1) + 'e'])
            if (times[days[i]] > times[days[i].slice(0, -1) + 'e']){
                console.log("convert")
                console.log(days[i])
            }
        }
    }

  return (
    <div className="timecontainer">
        <button type="button" onClick={toggleModal} className="btn-modal addbtn">Set Times</button>

        {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content3">
                    <button className="close-modal" onClick={toggleModal}> CLOSE</button>
                    <h2>Select Times</h2>
                    <p>Enter times in EST. If your time extends past midnight, keep it all in the same day. For example,  Monday 10pm - 1am.</p>
                    <table>
                        <tr>
                            <td width="100px">
                                <span>Sunday</span>
                            </td>
                            <td>
                                <select id="suns" onChange={handleChange}>
                                    <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                    <option value={30}>12:30 AM</option>
                                    <option value={60}>1:00 AM</option>
                                    <option value={90}>1:30 AM</option>
                                    <option value={120}>2:00 AM</option>
                                    <option value={150}>2:30 AM</option>
                                    <option value={180}>3:00 AM</option>
                                    <option value={210}>3:30 AM</option>
                                    <option value={240}>4:00 AM</option>
                                    <option value={270}>4:30 AM</option>
                                    <option value={300}>5:00 AM</option>
                                    <option value={330}>5:30 AM</option>
                                    <option value={360}>6:00 AM</option>
                                    <option value={390}>6:30 AM</option>
                                    <option value={420}>7:00 AM</option>
                                    <option value={450}>7:30 AM</option>
                                    <option value={480}>8:00 AM</option>
                                    <option value={510}>8:30 AM</option>
                                    <option value={540}>9:00 AM</option>
                                    <option value={570}>9:30 AM</option>
                                    <option value={600}>10:00 AM</option>
                                    <option value={630}>10:30 AM</option>
                                    <option value={660}>11:00 AM</option>
                                    <option value={690}>11:30 AM</option>
                                    <option value={720}>12:00 PM</option>
                                    <option value={750}>12:30 PM</option>
                                    <option value={780}>1:00 PM</option>
                                    <option value={810}>1:30 PM</option>
                                    <option value={840}>2:00 PM</option>
                                    <option value={870}>2:30 PM</option>
                                    <option value={900}>3:00 PM</option>
                                    <option value={930}>3:30 PM</option>
                                    <option value={960}>4:00 PM</option>
                                    <option value={990}>4:30 PM</option>
                                    <option value={1020}>5:00 PM</option>
                                    <option value={1050}>5:30 PM</option>
                                    <option value={1080}>6:00 PM</option>
                                    <option value={1110}>6:30 PM</option>
                                    <option value={1140}>7:00 PM</option>
                                    <option value={1170}>7:30 PM</option>
                                    <option value={1200}>8:00 PM</option>
                                    <option value={1230}>8:30 PM</option>
                                    <option value={1260}>9:00 PM</option>
                                    <option value={1290}>9:30 PM</option>
                                    <option value={1320}>10:00 PM</option>
                                    <option value={1350}>10:30 PM</option>
                                    <option value={1380}>11:00 PM</option>
                                    <option value={1410}>11:30 PM</option>
                                </select>
                            </td>
                            <span> to </span>
                            <select id="sune" onChange={handleChange}>
                                <option value={-1}>---</option>
                                <option value={0}>12:00 AM</option>
                                <option value={30}>12:30 AM</option>
                                <option value={60}>1:00 AM</option>
                                <option value={90}>1:30 AM</option>
                                <option value={120}>2:00 AM</option>
                                <option value={150}>2:30 AM</option>
                                <option value={180}>3:00 AM</option>
                                <option value={210}>3:30 AM</option>
                                <option value={240}>4:00 AM</option>
                                <option value={270}>4:30 AM</option>
                                <option value={300}>5:00 AM</option>
                                <option value={330}>5:30 AM</option>
                                <option value={360}>6:00 AM</option>
                                <option value={390}>6:30 AM</option>
                                <option value={420}>7:00 AM</option>
                                <option value={450}>7:30 AM</option>
                                <option value={480}>8:00 AM</option>
                                <option value={510}>8:30 AM</option>
                                <option value={540}>9:00 AM</option>
                                <option value={570}>9:30 AM</option>
                                <option value={600}>10:00 AM</option>
                                <option value={630}>10:30 AM</option>
                                <option value={660}>11:00 AM</option>
                                <option value={690}>11:30 AM</option>
                                <option value={720}>12:00 PM</option>
                                <option value={750}>12:30 PM</option>
                                <option value={780}>1:00 PM</option>
                                <option value={810}>1:30 PM</option>
                                <option value={840}>2:00 PM</option>
                                <option value={870}>2:30 PM</option>
                                <option value={900}>3:00 PM</option>
                                <option value={930}>3:30 PM</option>
                                <option value={960}>4:00 PM</option>
                                <option value={990}>4:30 PM</option>
                                <option value={1020}>5:00 PM</option>
                                <option value={1050}>5:30 PM</option>
                                <option value={1080}>6:00 PM</option>
                                <option value={1110}>6:30 PM</option>
                                <option value={1140}>7:00 PM</option>
                                <option value={1170}>7:30 PM</option>
                                <option value={1200}>8:00 PM</option>
                                <option value={1230}>8:30 PM</option>
                                <option value={1260}>9:00 PM</option>
                                <option value={1290}>9:30 PM</option>
                                <option value={1320}>10:00 PM</option>
                                <option value={1350}>10:30 PM</option>
                                <option value={1380}>11:00 PM</option>
                                <option value={1410}>11:30 PM</option>
                            </select>
                        </tr>
                        <tr>
                            <td>
                                <span>Monday</span>
                            </td>
                            <td>
                                <select id="suns" onChange={handleChange}>
                                    <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                    <option value={30}>12:30 AM</option>
                                    <option value={60}>1:00 AM</option>
                                    <option value={90}>1:30 AM</option>
                                    <option value={120}>2:00 AM</option>
                                    <option value={150}>2:30 AM</option>
                                    <option value={180}>3:00 AM</option>
                                    <option value={210}>3:30 AM</option>
                                    <option value={240}>4:00 AM</option>
                                    <option value={270}>4:30 AM</option>
                                    <option value={300}>5:00 AM</option>
                                    <option value={330}>5:30 AM</option>
                                    <option value={360}>6:00 AM</option>
                                    <option value={390}>6:30 AM</option>
                                    <option value={420}>7:00 AM</option>
                                    <option value={450}>7:30 AM</option>
                                    <option value={480}>8:00 AM</option>
                                    <option value={510}>8:30 AM</option>
                                    <option value={540}>9:00 AM</option>
                                    <option value={570}>9:30 AM</option>
                                    <option value={600}>10:00 AM</option>
                                    <option value={630}>10:30 AM</option>
                                    <option value={660}>11:00 AM</option>
                                    <option value={690}>11:30 AM</option>
                                    <option value={720}>12:00 PM</option>
                                    <option value={750}>12:30 PM</option>
                                    <option value={780}>1:00 PM</option>
                                    <option value={810}>1:30 PM</option>
                                    <option value={840}>2:00 PM</option>
                                    <option value={870}>2:30 PM</option>
                                    <option value={900}>3:00 PM</option>
                                    <option value={930}>3:30 PM</option>
                                    <option value={960}>4:00 PM</option>
                                    <option value={990}>4:30 PM</option>
                                    <option value={1020}>5:00 PM</option>
                                    <option value={1050}>5:30 PM</option>
                                    <option value={1080}>6:00 PM</option>
                                    <option value={1110}>6:30 PM</option>
                                    <option value={1140}>7:00 PM</option>
                                    <option value={1170}>7:30 PM</option>
                                    <option value={1200}>8:00 PM</option>
                                    <option value={1230}>8:30 PM</option>
                                    <option value={1260}>9:00 PM</option>
                                    <option value={1290}>9:30 PM</option>
                                    <option value={1320}>10:00 PM</option>
                                    <option value={1350}>10:30 PM</option>
                                    <option value={1380}>11:00 PM</option>
                                    <option value={1410}>11:30 PM</option>
                                </select>
                            </td>
                            <span> to </span>
                            <select id="sune" onChange={handleChange}>
                                <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                <option value={30}>12:30 AM</option>
                                <option value={60}>1:00 AM</option>
                                <option value={90}>1:30 AM</option>
                                <option value={120}>2:00 AM</option>
                                <option value={150}>2:30 AM</option>
                                <option value={180}>3:00 AM</option>
                                <option value={210}>3:30 AM</option>
                                <option value={240}>4:00 AM</option>
                                <option value={270}>4:30 AM</option>
                                <option value={300}>5:00 AM</option>
                                <option value={330}>5:30 AM</option>
                                <option value={360}>6:00 AM</option>
                                <option value={390}>6:30 AM</option>
                                <option value={420}>7:00 AM</option>
                                <option value={450}>7:30 AM</option>
                                <option value={480}>8:00 AM</option>
                                <option value={510}>8:30 AM</option>
                                <option value={540}>9:00 AM</option>
                                <option value={570}>9:30 AM</option>
                                <option value={600}>10:00 AM</option>
                                <option value={630}>10:30 AM</option>
                                <option value={660}>11:00 AM</option>
                                <option value={690}>11:30 AM</option>
                                <option value={720}>12:00 PM</option>
                                <option value={750}>12:30 PM</option>
                                <option value={780}>1:00 PM</option>
                                <option value={810}>1:30 PM</option>
                                <option value={840}>2:00 PM</option>
                                <option value={870}>2:30 PM</option>
                                <option value={900}>3:00 PM</option>
                                <option value={930}>3:30 PM</option>
                                <option value={960}>4:00 PM</option>
                                <option value={990}>4:30 PM</option>
                                <option value={1020}>5:00 PM</option>
                                <option value={1050}>5:30 PM</option>
                                <option value={1080}>6:00 PM</option>
                                <option value={1110}>6:30 PM</option>
                                <option value={1140}>7:00 PM</option>
                                <option value={1170}>7:30 PM</option>
                                <option value={1200}>8:00 PM</option>
                                <option value={1230}>8:30 PM</option>
                                <option value={1260}>9:00 PM</option>
                                <option value={1290}>9:30 PM</option>
                                <option value={1320}>10:00 PM</option>
                                <option value={1350}>10:30 PM</option>
                                <option value={1380}>11:00 PM</option>
                                <option value={1410}>11:30 PM</option>
                            </select>
                        </tr>
                        <tr>
                            <td>
                                <span>Tuesday</span>
                            </td>
                            <td>
                                <select id="tues" onChange={handleChange}>
                                    <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                    <option value={30}>12:30 AM</option>
                                    <option value={60}>1:00 AM</option>
                                    <option value={90}>1:30 AM</option>
                                    <option value={120}>2:00 AM</option>
                                    <option value={150}>2:30 AM</option>
                                    <option value={180}>3:00 AM</option>
                                    <option value={210}>3:30 AM</option>
                                    <option value={240}>4:00 AM</option>
                                    <option value={270}>4:30 AM</option>
                                    <option value={300}>5:00 AM</option>
                                    <option value={330}>5:30 AM</option>
                                    <option value={360}>6:00 AM</option>
                                    <option value={390}>6:30 AM</option>
                                    <option value={420}>7:00 AM</option>
                                    <option value={450}>7:30 AM</option>
                                    <option value={480}>8:00 AM</option>
                                    <option value={510}>8:30 AM</option>
                                    <option value={540}>9:00 AM</option>
                                    <option value={570}>9:30 AM</option>
                                    <option value={600}>10:00 AM</option>
                                    <option value={630}>10:30 AM</option>
                                    <option value={660}>11:00 AM</option>
                                    <option value={690}>11:30 AM</option>
                                    <option value={720}>12:00 PM</option>
                                    <option value={750}>12:30 PM</option>
                                    <option value={780}>1:00 PM</option>
                                    <option value={810}>1:30 PM</option>
                                    <option value={840}>2:00 PM</option>
                                    <option value={870}>2:30 PM</option>
                                    <option value={900}>3:00 PM</option>
                                    <option value={930}>3:30 PM</option>
                                    <option value={960}>4:00 PM</option>
                                    <option value={990}>4:30 PM</option>
                                    <option value={1020}>5:00 PM</option>
                                    <option value={1050}>5:30 PM</option>
                                    <option value={1080}>6:00 PM</option>
                                    <option value={1110}>6:30 PM</option>
                                    <option value={1140}>7:00 PM</option>
                                    <option value={1170}>7:30 PM</option>
                                    <option value={1200}>8:00 PM</option>
                                    <option value={1230}>8:30 PM</option>
                                    <option value={1260}>9:00 PM</option>
                                    <option value={1290}>9:30 PM</option>
                                    <option value={1320}>10:00 PM</option>
                                    <option value={1350}>10:30 PM</option>
                                    <option value={1380}>11:00 PM</option>
                                    <option value={1410}>11:30 PM</option>
                                </select>
                            </td>
                            <span> to </span>
                            <select id="tuee" onChange={handleChange}>
                                <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                <option value={30}>12:30 AM</option>
                                <option value={60}>1:00 AM</option>
                                <option value={90}>1:30 AM</option>
                                <option value={120}>2:00 AM</option>
                                <option value={150}>2:30 AM</option>
                                <option value={180}>3:00 AM</option>
                                <option value={210}>3:30 AM</option>
                                <option value={240}>4:00 AM</option>
                                <option value={270}>4:30 AM</option>
                                <option value={300}>5:00 AM</option>
                                <option value={330}>5:30 AM</option>
                                <option value={360}>6:00 AM</option>
                                <option value={390}>6:30 AM</option>
                                <option value={420}>7:00 AM</option>
                                <option value={450}>7:30 AM</option>
                                <option value={480}>8:00 AM</option>
                                <option value={510}>8:30 AM</option>
                                <option value={540}>9:00 AM</option>
                                <option value={570}>9:30 AM</option>
                                <option value={600}>10:00 AM</option>
                                <option value={630}>10:30 AM</option>
                                <option value={660}>11:00 AM</option>
                                <option value={690}>11:30 AM</option>
                                <option value={720}>12:00 PM</option>
                                <option value={750}>12:30 PM</option>
                                <option value={780}>1:00 PM</option>
                                <option value={810}>1:30 PM</option>
                                <option value={840}>2:00 PM</option>
                                <option value={870}>2:30 PM</option>
                                <option value={900}>3:00 PM</option>
                                <option value={930}>3:30 PM</option>
                                <option value={960}>4:00 PM</option>
                                <option value={990}>4:30 PM</option>
                                <option value={1020}>5:00 PM</option>
                                <option value={1050}>5:30 PM</option>
                                <option value={1080}>6:00 PM</option>
                                <option value={1110}>6:30 PM</option>
                                <option value={1140}>7:00 PM</option>
                                <option value={1170}>7:30 PM</option>
                                <option value={1200}>8:00 PM</option>
                                <option value={1230}>8:30 PM</option>
                                <option value={1260}>9:00 PM</option>
                                <option value={1290}>9:30 PM</option>
                                <option value={1320}>10:00 PM</option>
                                <option value={1350}>10:30 PM</option>
                                <option value={1380}>11:00 PM</option>
                                <option value={1410}>11:30 PM</option>
                            </select>
                        </tr>
                        <tr>
                            <td>
                                <span>Wednesday</span>
                            </td>
                            <td>
                                <select id="weds" onChange={handleChange}>
                                    <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                    <option value={30}>12:30 AM</option>
                                    <option value={60}>1:00 AM</option>
                                    <option value={90}>1:30 AM</option>
                                    <option value={120}>2:00 AM</option>
                                    <option value={150}>2:30 AM</option>
                                    <option value={180}>3:00 AM</option>
                                    <option value={210}>3:30 AM</option>
                                    <option value={240}>4:00 AM</option>
                                    <option value={270}>4:30 AM</option>
                                    <option value={300}>5:00 AM</option>
                                    <option value={330}>5:30 AM</option>
                                    <option value={360}>6:00 AM</option>
                                    <option value={390}>6:30 AM</option>
                                    <option value={420}>7:00 AM</option>
                                    <option value={450}>7:30 AM</option>
                                    <option value={480}>8:00 AM</option>
                                    <option value={510}>8:30 AM</option>
                                    <option value={540}>9:00 AM</option>
                                    <option value={570}>9:30 AM</option>
                                    <option value={600}>10:00 AM</option>
                                    <option value={630}>10:30 AM</option>
                                    <option value={660}>11:00 AM</option>
                                    <option value={690}>11:30 AM</option>
                                    <option value={720}>12:00 PM</option>
                                    <option value={750}>12:30 PM</option>
                                    <option value={780}>1:00 PM</option>
                                    <option value={810}>1:30 PM</option>
                                    <option value={840}>2:00 PM</option>
                                    <option value={870}>2:30 PM</option>
                                    <option value={900}>3:00 PM</option>
                                    <option value={930}>3:30 PM</option>
                                    <option value={960}>4:00 PM</option>
                                    <option value={990}>4:30 PM</option>
                                    <option value={1020}>5:00 PM</option>
                                    <option value={1050}>5:30 PM</option>
                                    <option value={1080}>6:00 PM</option>
                                    <option value={1110}>6:30 PM</option>
                                    <option value={1140}>7:00 PM</option>
                                    <option value={1170}>7:30 PM</option>
                                    <option value={1200}>8:00 PM</option>
                                    <option value={1230}>8:30 PM</option>
                                    <option value={1260}>9:00 PM</option>
                                    <option value={1290}>9:30 PM</option>
                                    <option value={1320}>10:00 PM</option>
                                    <option value={1350}>10:30 PM</option>
                                    <option value={1380}>11:00 PM</option>
                                    <option value={1410}>11:30 PM</option>
                                </select>
                            </td>
                            <span> to </span>
                            <select id="wede" onChange={handleChange}>
                                <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                <option value={30}>12:30 AM</option>
                                <option value={60}>1:00 AM</option>
                                <option value={90}>1:30 AM</option>
                                <option value={120}>2:00 AM</option>
                                <option value={150}>2:30 AM</option>
                                <option value={180}>3:00 AM</option>
                                <option value={210}>3:30 AM</option>
                                <option value={240}>4:00 AM</option>
                                <option value={270}>4:30 AM</option>
                                <option value={300}>5:00 AM</option>
                                <option value={330}>5:30 AM</option>
                                <option value={360}>6:00 AM</option>
                                <option value={390}>6:30 AM</option>
                                <option value={420}>7:00 AM</option>
                                <option value={450}>7:30 AM</option>
                                <option value={480}>8:00 AM</option>
                                <option value={510}>8:30 AM</option>
                                <option value={540}>9:00 AM</option>
                                <option value={570}>9:30 AM</option>
                                <option value={600}>10:00 AM</option>
                                <option value={630}>10:30 AM</option>
                                <option value={660}>11:00 AM</option>
                                <option value={690}>11:30 AM</option>
                                <option value={720}>12:00 PM</option>
                                <option value={750}>12:30 PM</option>
                                <option value={780}>1:00 PM</option>
                                <option value={810}>1:30 PM</option>
                                <option value={840}>2:00 PM</option>
                                <option value={870}>2:30 PM</option>
                                <option value={900}>3:00 PM</option>
                                <option value={930}>3:30 PM</option>
                                <option value={960}>4:00 PM</option>
                                <option value={990}>4:30 PM</option>
                                <option value={1020}>5:00 PM</option>
                                <option value={1050}>5:30 PM</option>
                                <option value={1080}>6:00 PM</option>
                                <option value={1110}>6:30 PM</option>
                                <option value={1140}>7:00 PM</option>
                                <option value={1170}>7:30 PM</option>
                                <option value={1200}>8:00 PM</option>
                                <option value={1230}>8:30 PM</option>
                                <option value={1260}>9:00 PM</option>
                                <option value={1290}>9:30 PM</option>
                                <option value={1320}>10:00 PM</option>
                                <option value={1350}>10:30 PM</option>
                                <option value={1380}>11:00 PM</option>
                                <option value={1410}>11:30 PM</option>
                            </select>
                        </tr>
                        <tr>
                            <td>
                                <span>Thursday</span>
                            </td>
                            <td>
                                <select id="thurs" onChange={handleChange}>
                                    <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                    <option value={30}>12:30 AM</option>
                                    <option value={60}>1:00 AM</option>
                                    <option value={90}>1:30 AM</option>
                                    <option value={120}>2:00 AM</option>
                                    <option value={150}>2:30 AM</option>
                                    <option value={180}>3:00 AM</option>
                                    <option value={210}>3:30 AM</option>
                                    <option value={240}>4:00 AM</option>
                                    <option value={270}>4:30 AM</option>
                                    <option value={300}>5:00 AM</option>
                                    <option value={330}>5:30 AM</option>
                                    <option value={360}>6:00 AM</option>
                                    <option value={390}>6:30 AM</option>
                                    <option value={420}>7:00 AM</option>
                                    <option value={450}>7:30 AM</option>
                                    <option value={480}>8:00 AM</option>
                                    <option value={510}>8:30 AM</option>
                                    <option value={540}>9:00 AM</option>
                                    <option value={570}>9:30 AM</option>
                                    <option value={600}>10:00 AM</option>
                                    <option value={630}>10:30 AM</option>
                                    <option value={660}>11:00 AM</option>
                                    <option value={690}>11:30 AM</option>
                                    <option value={720}>12:00 PM</option>
                                    <option value={750}>12:30 PM</option>
                                    <option value={780}>1:00 PM</option>
                                    <option value={810}>1:30 PM</option>
                                    <option value={840}>2:00 PM</option>
                                    <option value={870}>2:30 PM</option>
                                    <option value={900}>3:00 PM</option>
                                    <option value={930}>3:30 PM</option>
                                    <option value={960}>4:00 PM</option>
                                    <option value={990}>4:30 PM</option>
                                    <option value={1020}>5:00 PM</option>
                                    <option value={1050}>5:30 PM</option>
                                    <option value={1080}>6:00 PM</option>
                                    <option value={1110}>6:30 PM</option>
                                    <option value={1140}>7:00 PM</option>
                                    <option value={1170}>7:30 PM</option>
                                    <option value={1200}>8:00 PM</option>
                                    <option value={1230}>8:30 PM</option>
                                    <option value={1260}>9:00 PM</option>
                                    <option value={1290}>9:30 PM</option>
                                    <option value={1320}>10:00 PM</option>
                                    <option value={1350}>10:30 PM</option>
                                    <option value={1380}>11:00 PM</option>
                                    <option value={1410}>11:30 PM</option>
                                </select>
                            </td>
                            <span> to </span>
                            <select id="thure" onChange={handleChange}>
                                <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                <option value={30}>12:30 AM</option>
                                <option value={60}>1:00 AM</option>
                                <option value={90}>1:30 AM</option>
                                <option value={120}>2:00 AM</option>
                                <option value={150}>2:30 AM</option>
                                <option value={180}>3:00 AM</option>
                                <option value={210}>3:30 AM</option>
                                <option value={240}>4:00 AM</option>
                                <option value={270}>4:30 AM</option>
                                <option value={300}>5:00 AM</option>
                                <option value={330}>5:30 AM</option>
                                <option value={360}>6:00 AM</option>
                                <option value={390}>6:30 AM</option>
                                <option value={420}>7:00 AM</option>
                                <option value={450}>7:30 AM</option>
                                <option value={480}>8:00 AM</option>
                                <option value={510}>8:30 AM</option>
                                <option value={540}>9:00 AM</option>
                                <option value={570}>9:30 AM</option>
                                <option value={600}>10:00 AM</option>
                                <option value={630}>10:30 AM</option>
                                <option value={660}>11:00 AM</option>
                                <option value={690}>11:30 AM</option>
                                <option value={720}>12:00 PM</option>
                                <option value={750}>12:30 PM</option>
                                <option value={780}>1:00 PM</option>
                                <option value={810}>1:30 PM</option>
                                <option value={840}>2:00 PM</option>
                                <option value={870}>2:30 PM</option>
                                <option value={900}>3:00 PM</option>
                                <option value={930}>3:30 PM</option>
                                <option value={960}>4:00 PM</option>
                                <option value={990}>4:30 PM</option>
                                <option value={1020}>5:00 PM</option>
                                <option value={1050}>5:30 PM</option>
                                <option value={1080}>6:00 PM</option>
                                <option value={1110}>6:30 PM</option>
                                <option value={1140}>7:00 PM</option>
                                <option value={1170}>7:30 PM</option>
                                <option value={1200}>8:00 PM</option>
                                <option value={1230}>8:30 PM</option>
                                <option value={1260}>9:00 PM</option>
                                <option value={1290}>9:30 PM</option>
                                <option value={1320}>10:00 PM</option>
                                <option value={1350}>10:30 PM</option>
                                <option value={1380}>11:00 PM</option>
                                <option value={1410}>11:30 PM</option>
                            </select>
                        </tr>
                        <tr>
                            <td>
                                <span>Friday</span>
                            </td>
                            <td>
                                <select id="fris" onChange={handleChange}>
                                    <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                    <option value={30}>12:30 AM</option>
                                    <option value={60}>1:00 AM</option>
                                    <option value={90}>1:30 AM</option>
                                    <option value={120}>2:00 AM</option>
                                    <option value={150}>2:30 AM</option>
                                    <option value={180}>3:00 AM</option>
                                    <option value={210}>3:30 AM</option>
                                    <option value={240}>4:00 AM</option>
                                    <option value={270}>4:30 AM</option>
                                    <option value={300}>5:00 AM</option>
                                    <option value={330}>5:30 AM</option>
                                    <option value={360}>6:00 AM</option>
                                    <option value={390}>6:30 AM</option>
                                    <option value={420}>7:00 AM</option>
                                    <option value={450}>7:30 AM</option>
                                    <option value={480}>8:00 AM</option>
                                    <option value={510}>8:30 AM</option>
                                    <option value={540}>9:00 AM</option>
                                    <option value={570}>9:30 AM</option>
                                    <option value={600}>10:00 AM</option>
                                    <option value={630}>10:30 AM</option>
                                    <option value={660}>11:00 AM</option>
                                    <option value={690}>11:30 AM</option>
                                    <option value={720}>12:00 PM</option>
                                    <option value={750}>12:30 PM</option>
                                    <option value={780}>1:00 PM</option>
                                    <option value={810}>1:30 PM</option>
                                    <option value={840}>2:00 PM</option>
                                    <option value={870}>2:30 PM</option>
                                    <option value={900}>3:00 PM</option>
                                    <option value={930}>3:30 PM</option>
                                    <option value={960}>4:00 PM</option>
                                    <option value={990}>4:30 PM</option>
                                    <option value={1020}>5:00 PM</option>
                                    <option value={1050}>5:30 PM</option>
                                    <option value={1080}>6:00 PM</option>
                                    <option value={1110}>6:30 PM</option>
                                    <option value={1140}>7:00 PM</option>
                                    <option value={1170}>7:30 PM</option>
                                    <option value={1200}>8:00 PM</option>
                                    <option value={1230}>8:30 PM</option>
                                    <option value={1260}>9:00 PM</option>
                                    <option value={1290}>9:30 PM</option>
                                    <option value={1320}>10:00 PM</option>
                                    <option value={1350}>10:30 PM</option>
                                    <option value={1380}>11:00 PM</option>
                                    <option value={1410}>11:30 PM</option>
                                </select>
                            </td>
                            <span> to </span>
                            <select id="frie" onChange={handleChange}>
                                <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                <option value={30}>12:30 AM</option>
                                <option value={60}>1:00 AM</option>
                                <option value={90}>1:30 AM</option>
                                <option value={120}>2:00 AM</option>
                                <option value={150}>2:30 AM</option>
                                <option value={180}>3:00 AM</option>
                                <option value={210}>3:30 AM</option>
                                <option value={240}>4:00 AM</option>
                                <option value={270}>4:30 AM</option>
                                <option value={300}>5:00 AM</option>
                                <option value={330}>5:30 AM</option>
                                <option value={360}>6:00 AM</option>
                                <option value={390}>6:30 AM</option>
                                <option value={420}>7:00 AM</option>
                                <option value={450}>7:30 AM</option>
                                <option value={480}>8:00 AM</option>
                                <option value={510}>8:30 AM</option>
                                <option value={540}>9:00 AM</option>
                                <option value={570}>9:30 AM</option>
                                <option value={600}>10:00 AM</option>
                                <option value={630}>10:30 AM</option>
                                <option value={660}>11:00 AM</option>
                                <option value={690}>11:30 AM</option>
                                <option value={720}>12:00 PM</option>
                                <option value={750}>12:30 PM</option>
                                <option value={780}>1:00 PM</option>
                                <option value={810}>1:30 PM</option>
                                <option value={840}>2:00 PM</option>
                                <option value={870}>2:30 PM</option>
                                <option value={900}>3:00 PM</option>
                                <option value={930}>3:30 PM</option>
                                <option value={960}>4:00 PM</option>
                                <option value={990}>4:30 PM</option>
                                <option value={1020}>5:00 PM</option>
                                <option value={1050}>5:30 PM</option>
                                <option value={1080}>6:00 PM</option>
                                <option value={1110}>6:30 PM</option>
                                <option value={1140}>7:00 PM</option>
                                <option value={1170}>7:30 PM</option>
                                <option value={1200}>8:00 PM</option>
                                <option value={1230}>8:30 PM</option>
                                <option value={1260}>9:00 PM</option>
                                <option value={1290}>9:30 PM</option>
                                <option value={1320}>10:00 PM</option>
                                <option value={1350}>10:30 PM</option>
                                <option value={1380}>11:00 PM</option>
                                <option value={1410}>11:30 PM</option>
                            </select>
                        </tr>
                        <tr>
                            <td>
                                <span>Saturday</span>
                            </td>
                            <td>
                                <select id="sats" onChange={handleChange}>
                                    <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                    <option value={30}>12:30 AM</option>
                                    <option value={60}>1:00 AM</option>
                                    <option value={90}>1:30 AM</option>
                                    <option value={120}>2:00 AM</option>
                                    <option value={150}>2:30 AM</option>
                                    <option value={180}>3:00 AM</option>
                                    <option value={210}>3:30 AM</option>
                                    <option value={240}>4:00 AM</option>
                                    <option value={270}>4:30 AM</option>
                                    <option value={300}>5:00 AM</option>
                                    <option value={330}>5:30 AM</option>
                                    <option value={360}>6:00 AM</option>
                                    <option value={390}>6:30 AM</option>
                                    <option value={420}>7:00 AM</option>
                                    <option value={450}>7:30 AM</option>
                                    <option value={480}>8:00 AM</option>
                                    <option value={510}>8:30 AM</option>
                                    <option value={540}>9:00 AM</option>
                                    <option value={570}>9:30 AM</option>
                                    <option value={600}>10:00 AM</option>
                                    <option value={630}>10:30 AM</option>
                                    <option value={660}>11:00 AM</option>
                                    <option value={690}>11:30 AM</option>
                                    <option value={720}>12:00 PM</option>
                                    <option value={750}>12:30 PM</option>
                                    <option value={780}>1:00 PM</option>
                                    <option value={810}>1:30 PM</option>
                                    <option value={840}>2:00 PM</option>
                                    <option value={870}>2:30 PM</option>
                                    <option value={900}>3:00 PM</option>
                                    <option value={930}>3:30 PM</option>
                                    <option value={960}>4:00 PM</option>
                                    <option value={990}>4:30 PM</option>
                                    <option value={1020}>5:00 PM</option>
                                    <option value={1050}>5:30 PM</option>
                                    <option value={1080}>6:00 PM</option>
                                    <option value={1110}>6:30 PM</option>
                                    <option value={1140}>7:00 PM</option>
                                    <option value={1170}>7:30 PM</option>
                                    <option value={1200}>8:00 PM</option>
                                    <option value={1230}>8:30 PM</option>
                                    <option value={1260}>9:00 PM</option>
                                    <option value={1290}>9:30 PM</option>
                                    <option value={1320}>10:00 PM</option>
                                    <option value={1350}>10:30 PM</option>
                                    <option value={1380}>11:00 PM</option>
                                    <option value={1410}>11:30 PM</option>
                                </select>
                            </td>
                            <span> to </span>
                            <select id="sate" onChange={handleChange}>
                                <option value={-1}>---</option><option value={0}>12:00 AM</option>
                                <option value={30}>12:30 AM</option>
                                <option value={60}>1:00 AM</option>
                                <option value={90}>1:30 AM</option>
                                <option value={120}>2:00 AM</option>
                                <option value={150}>2:30 AM</option>
                                <option value={180}>3:00 AM</option>
                                <option value={210}>3:30 AM</option>
                                <option value={240}>4:00 AM</option>
                                <option value={270}>4:30 AM</option>
                                <option value={300}>5:00 AM</option>
                                <option value={330}>5:30 AM</option>
                                <option value={360}>6:00 AM</option>
                                <option value={390}>6:30 AM</option>
                                <option value={420}>7:00 AM</option>
                                <option value={450}>7:30 AM</option>
                                <option value={480}>8:00 AM</option>
                                <option value={510}>8:30 AM</option>
                                <option value={540}>9:00 AM</option>
                                <option value={570}>9:30 AM</option>
                                <option value={600}>10:00 AM</option>
                                <option value={630}>10:30 AM</option>
                                <option value={660}>11:00 AM</option>
                                <option value={690}>11:30 AM</option>
                                <option value={720}>12:00 PM</option>
                                <option value={750}>12:30 PM</option>
                                <option value={780}>1:00 PM</option>
                                <option value={810}>1:30 PM</option>
                                <option value={840}>2:00 PM</option>
                                <option value={870}>2:30 PM</option>
                                <option value={900}>3:00 PM</option>
                                <option value={930}>3:30 PM</option>
                                <option value={960}>4:00 PM</option>
                                <option value={990}>4:30 PM</option>
                                <option value={1020}>5:00 PM</option>
                                <option value={1050}>5:30 PM</option>
                                <option value={1080}>6:00 PM</option>
                                <option value={1110}>6:30 PM</option>
                                <option value={1140}>7:00 PM</option>
                                <option value={1170}>7:30 PM</option>
                                <option value={1200}>8:00 PM</option>
                                <option value={1230}>8:30 PM</option>
                                <option value={1260}>9:00 PM</option>
                                <option value={1290}>9:30 PM</option>
                                <option value={1320}>10:00 PM</option>
                                <option value={1350}>10:30 PM</option>
                                <option value={1380}>11:00 PM</option>
                                <option value={1410}>11:30 PM</option>
                            </select>
                        </tr>
                    </table>
                    <button type="button" onClick={submitTimes}>Confirm Times</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default TimeSelect