import { TextField } from '@mui/material';

const EditForm = ({ editedContact, handleEditChange }) => {
  return (
    <form>
      <TextField
        label="New name"
        name="name"
        value={editedContact.name}
        onChange={handleEditChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New number"
        name="number"
        value={editedContact.number}
        onChange={handleEditChange}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />
    </form>
  );
};

export default EditForm;
