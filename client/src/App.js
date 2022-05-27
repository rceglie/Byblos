import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import soxpicture from './images/sox.jpg';

import "./style/app.css"

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch]);

    return (
        <html lang="en">
            <head>
                <title>Byblos</title>
            </head>
            <body>
                <Container maxidth="lg">
                    <AppBar className="" position="static" color="inherit">
                        <Typography className="" variant="h2" align="center">Memories</Typography>
                        <img className="soxlogo" src={soxpicture} alt="" height="200" />
                    </AppBar>
                    <Grow in>
                        <Container>
                            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                                <Grid item xs={12} sm={7}>
                                    <Posts setCurrentId={setCurrentId}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </Container>
            </body>
        </html>
    )
}

export default App;