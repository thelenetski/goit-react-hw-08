import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { FaPhone } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { IconButton } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { openConfirmDelete, openEditContact } from '../../redux/modal/slice';
import ModalWindow from '../Modal/Modal';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

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
        onClick={() => dispatch(openEditContact(contact))}
      >
        <MdEdit />
      </IconButton>
      <IconButton
        color="error"
        aria-label="delete"
        onClick={() => dispatch(openConfirmDelete(contact))}
        size="large"
      >
        <IoClose />
      </IconButton>
      <ModalWindow>
        <p>Are you sure you want to delete this contact?</p>
      </ModalWindow>
    </div>
  );
};

export default Contact;
