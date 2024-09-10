import { createPortal } from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, modalTypes } from '../../redux/modal/slice';
import {
  selectContentModal,
  selectIsOpenModal,
  selectTypeModal,
} from '../../redux/modal/selectors';
import { useEffect, useState } from 'react';
import { deleteContact, patchContact } from '../../redux/contacts/operations';
import EditForm from './EditForm';

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  const type = useSelector(selectTypeModal);
  const content = useSelector(selectContentModal);

  const [editedContact, setEditedContact] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    if (type !== modalTypes.editContact) return;
    setEditedContact(content);
  }, [content, type]);

  const handleDelete = () => {
    dispatch(deleteContact(content.id));
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditedContact(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    dispatch(patchContact({ ...editedContact }));
  };

  const onSuccess = () => {
    if (type === modalTypes.confirmDelete) return handleDelete();
    if (type === modalTypes.editContact) return handleEditSubmit();
  };

  const onClose = () => dispatch(closeModal());

  return createPortal(
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Notification
          </Typography>
          {type === modalTypes.confirmDelete && children}
          {type === modalTypes.editContact && (
            <EditForm
              editedContact={editedContact}
              handleEditChange={handleEditChange}
            />
          )}
          <Button
            onClick={onSuccess}
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
          >
            Confirm
          </Button>
          <Button onClick={onClose} variant="contained" color="error">
            Decline
          </Button>
        </Box>
      </Modal>
    </>,
    document.getElementById('modal-root')
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '1px solid #777',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default ModalWindow;
