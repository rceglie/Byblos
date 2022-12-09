import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import moment from 'moment';
// import { useDispatch } from 'react-redux';
// import {deletePost, likePost} from '../../actions/posts';
import {useNavigate, useParams} from 'react-router-dom'
import "../../style/expandedgroup.css"
import * as api from "../../api";
import Popup from 'reactjs-popup';
import ScheduleSelector from 'react-schedule-selector'

const ExpandedGroup = ({props}) => {

    let groupid = useParams().id;
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const info = await api.fetchGroup(groupid);
            console.log(info)
            setData(info.data)
        }
        fetchData();
      }, [])

    // use effect for on load : get info for id and display

    const renderCustomTimeCell = (time, selected, innerRef) => (
        <div style={{ textAlign: 'center'}} ref={innerRef}>
            <div style={{ height: '2.5vh', width: '100%', 'backgroundColor': selected ? 'blue' : 'lightBlue'}}>
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
        <div>
            <p>{data.fight}</p>
            <p>{data.prog}</p>
            <p>{data.comp}</p>
            <p>{data.exp}</p>
            <p>{data.roles}</p>
            <p>{data.desc}</p>
            <p>{data.createdAt}</p>
            <p>{data.ilvl}</p>
            <p>{data.sum}</p>
            <p>{data.times}</p>

            <div className="times">
                <Popup trigger={
                    <Button variant="outlined" style={{width:"100%", height: "5.5vh"}} sx={theme}>
                        View Availability
                    </Button>
                } position="center" modal
                    contentStyle={{
                        width: "50vw", border: "#673FD7 10px inset",
                        borderRadius: "5%"
                        }}>
                    {close => (
                        <div>
                            <button onClick={close}>close</button>
                            <div style={{pointerEvents:"none"}}>
                                <ScheduleSelector
                                    selection={data.times}
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
                            </div>
                            
                        </div>
                    )}
                </Popup>
            </div>

        </div>
        
    );
}

export default ExpandedGroup;