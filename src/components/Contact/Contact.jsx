import { useDispatch } from 'react-redux';
import { deleteContact, patchContact } from '../../redux/contacts/operations';
import css from './Contact.module.css';
import { FaPhone } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { IconButton, TextField } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import ModalWindow from '../Modal/Modal';
import { useState } from 'react';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState({
    name: contact.name,
    number: contact.number,
  });

  const closeModal = () => setIsModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedContact({
      id: contact.id,
      name: contact.name,
      number: contact.number,
    });
  };

  const onDelete = () => setIsModalOpen(true);
  const onEdit = () => setIsEditModalOpen(true);

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditedContact(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    dispatch(patchContact({ id: contact.id, ...editedContact }));
    closeEditModal();
  };

  const onSuccess = () => {
    dispatch(deleteContact(contact.id));
    closeModal();
  };

  return (
    <div className={css.contact}>
      <div className={css.contactData}>
        <div>
          <FaUser />
          <p>{contact.name}</p>
        </div>
        <div>
          <FaPhone />
          <p>{contact.number}</p>
        </div>
      </div>
      <IconButton
        color="success"
        size="large"
        aria-label="change"
        onClick={onEdit}
      >
        <MdEdit />
      </IconButton>
      <IconButton
        color="error"
        aria-label="delete"
        onClick={onDelete}
        size="large"
      >
        <IoClose />
      </IconButton>
      <ModalWindow
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={onSuccess}
      >
        <p>Are you sure you want to delete this contact?</p>
      </ModalWindow>
      <ModalWindow
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSuccess={handleEditSubmit}
      >
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
      </ModalWindow>
    </div>
  );
};

export default Contact;
