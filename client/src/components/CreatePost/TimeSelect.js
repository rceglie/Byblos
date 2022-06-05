import React, {useEffect, useState} from 'react';
import "../../style/timeselect.css";
import "../../style/createpost.css";

const TimeSelect = (props) => {

    const [modal, setModal] = useState(false);
    const [times, setTimes] = useState(
        props.times != null ?
            props.times
            :
            {suns:"", mons:"", tues: "", weds: "", thurs:"", fris:"", sats:"",sune:"", mone:"", tuee: "", wede: "", thure:"", frie:"", sate:"",}
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
        setTimes({...times, suns: document.getElementById("suns").value})
        props.parentCallback(times)
        toggleModal()
    }

    const handleChange = (e) => {
        let tar = e.target.id;
        setTimes({...times, [tar]: e.target.value})
    }

  return (
    <div className="timecontainer">
        <button type="button" onClick={toggleModal} className="btn-modal addbtn">Set Times</button>

        {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <button className="close-modal" onClick={toggleModal}> CLOSE</button>
                    <h2>Select Times</h2>
                    <p>Enter times in EST. If your time extends past midnight, keep it all in the same day. For example,  Monday 10pm - 1am.</p>
                    <div className="time-area">
                        <div className="date">
                            <label htmlFor="sune">Sunday</label>
                            <input type="time" id="suns" onChange={handleChange} value={times.suns}/>
                            <label className="to" htmlFor="sune">to</label>
                            <input type="time" id="sune" onChange={handleChange} value={times.sune}/>
                        </div>
                        <div className="date">
                            <label htmlFor="mons">Monday</label>
                            <input type="time" id="mons" onChange={handleChange} value={times.mons}/>
                            <label className="to" htmlFor="mone">to</label>
                            <input type="time" id="mone" onChange={handleChange} value={times.mone}/>
                        </div>
                        <div className="date">
                            <label htmlFor="tues">Tuesday</label>
                            <input type="time" id="tues" onChange={handleChange} value={times.tues}/>
                            <label className="to" htmlFor="tuee">to</label>
                            <input type="time" id="tuee" onChange={handleChange} value={times.tuee}/>
                        </div>
                        <div className="date">
                            <label htmlFor="weds">Wednesday</label>
                            <input type="time" id="weds" onChange={handleChange} value={times.weds}/>
                            <label className="to" htmlFor="wede">to</label>
                            <input type="time" id="wede" onChange={handleChange} value={times.wede}/>
                        </div>
                        <div className="date">
                            <label htmlFor="thurs">Thursday</label>
                            <input type="time" id="thurs" onChange={handleChange} value={times.thurs}/>
                            <label className="to" htmlFor="thure">to</label>
                            <input type="time" id="thure" onChange={handleChange} value={times.thure}/>
                        </div>
                        <div className="date">
                            <label htmlFor="fris">Friday</label>
                            <input type="time" id="fris" onChange={handleChange} value={times.fris}/>
                            <label className="to" htmlFor="frie">to</label>
                            <input type="time" id="frie" onChange={handleChange} value={times.frie}/>
                        </div>
                        <div className="date">
                            <label htmlFor="sats">Saturday</label>
                            <input type="time" id="sats" onChange={handleChange} value={times.sats}/>
                            <label className="to" htmlFor="sate">to</label>
                            <input type="time" id="sate" onChange={handleChange} value={times.sate}/>
                        </div>
                    </div>
                    <button type="button" onClick={submitTimes}>Confirm Times</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default TimeSelect