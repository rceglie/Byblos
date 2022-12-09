import React from 'react';
import { Button, Typography, ButtonBase} from '@mui/material';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import "../../style/post.css"
import BetterTimeSelect from "../Util/BetterTimeSelect";
import Popup from 'reactjs-popup';
import ScheduleSelector from 'react-schedule-selector'

const Player = ({player, setCurrentId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const expandPlayer = () => {
        console.log("clicked")
        //navigate(`/group/${post._id}`);
    }

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
        <div className="card-container border">
                <ButtonBase
                    component="span"
                    name="test"
                    onClick={expandPlayer}
                >
                    <div>
                        <Typography variant="h6">{player.name}</Typography>
                        <Typography variant="body2">Fight: {player.fight}</Typography>
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
                                                selection={player.times}
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
                        <Typography variant="body2">Times: {player.times}</Typography>
                        <Typography variant="body2">Prog:  {player.prog}</Typography>
                        <Typography variant="body2">Roles: {player.roles}</Typography>
                        <Typography variant="body2">ilvl:  {player.ilvl}</Typography>
                        <Typography variant="body2">Exp:   {player.exp}</Typography>
                        <Typography variant="body2">Desc:  {player.desc}</Typography>
                        <button onClick={() => (window.open("https://discordapp.com/users/" + player.discord))}>Contact</button>
                    </div>
                </ButtonBase>
        </div>
    );
}

export default Player;