import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';

const Input = ({name, handleChange, label, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item xs={12} >
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
        />
    </Grid>
  )
}

export default Input