import React, {useEffect, useState} from 'react';
import "../../style/bettertimeselect.css";
import ScheduleSelector from 'react-schedule-selector/dist/lib/ScheduleSelector';

const TimeSelect = (props) => {

    const [modal, setModal] = useState(false);
    const [times, setTimes] = useState([]);

    const toggleModal = () => {
        setTimes(props.times)
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

    const handleTimeChange = (e) => {
        setTimes(e)
    }

    const submitTimes = () => {
        props.parentCallback(times)
        toggleModal()
    }

  return (
    <div className="timecontainer">
        <button type="button" onClick={toggleModal} className="btn-modal addbtn">Better Set Times</button>

        {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content3">
                    <div className="modal-header">
                        <button className="close-button modal-button" onClick={toggleModal}>X</button>
                        <h1>Select Times (EST)</h1>
                    </div>
                    <ScheduleSelector
                        selection={times}
                        numDays={7}
                        minTime={0}
                        maxTime={24}
                        hourlyChunks={1}
                        rowGap={"1px"}
                        dateFormat={"ddd"}
                        timeFormat={"hh:mm A"}
                        startDate={"11-20-22"}
                        onChange={handleTimeChange}
                    />
                    <button className="save-times modal-button" onClick={submitTimes}>Confirm Times</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default TimeSelect