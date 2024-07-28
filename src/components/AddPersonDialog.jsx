import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
];

const AddPersonDialog = ({ openAddPerson, onCloseAddPerson }) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = () => {
        // Handle form submission
        // console.log({ name, gender, age });
        onCloseAddPerson();
    };

    return (
        <Dialog open={openAddPerson} onClose={openAddPerson}>
            <DialogTitle>Form</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="gender"
                    label="Gender"
                    select
                    fullWidth
                    variant="standard"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    id="age"
                    label="Age"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button    sx={{textTransform: "none"}} onClick={onCloseAddPerson}>Cancel</Button>
                <Button    sx={{textTransform: "none"}} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

// export default MyDialog;


export default AddPersonDialog