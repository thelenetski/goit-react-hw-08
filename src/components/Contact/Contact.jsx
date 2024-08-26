import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import css from './Contact.module.css';
import { FaPhone } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { IconButton } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import ModalWindow from '../Modal/Modal';
import { useState } from 'react';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const onDelete = () => setIsModalOpen(true);

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
      <IconButton color="success" size="large">
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
        Are you sure you want to delete this contact?
      </ModalWindow>
    </div>
  );
};

export default Contact;
