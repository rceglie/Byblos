import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';

import "../../style/app.css"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keyCode == 13) {
            searchPost();
        }
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(",")}))
            navigate(`/posts/search?searchQuery=${search || ''}&tags=${tags.join(',')}`)
        } else {
            navigate("/");
        }
    }

    const handleAdd = (tag) => setTags ([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag != tagToDelete))

  return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <AppBar position="static" color="inherit">
                        <TextField name="search" variant="outlined" label="Search Fight" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <ChipInput value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags"/>
                        <Button variant="contained" onClick={searchPost} color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Paper>
                        <Pagination page={page}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home