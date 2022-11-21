import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost, likePost} from '../../actions/posts';
import {useNavigate} from 'react-router-dom'
import "../../style/post.css"
import BetterTimeSelect from "../Util/BetterTimeSelect";

const Player = ({player, setCurrentId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const expandPlayer = () => {
        console.log("clicked")
        //navigate(`/group/${post._id}`);
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
                        <BetterTimeSelect times={player.times} parentCallback={() => {}} label={"View Availability"} viewonly={true}/>
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