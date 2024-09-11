import { useDispatch, useSelector } from 'react-redux';
import css from './Contact.module.css';
import { FaPhone } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { IconButton } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import {
  modalTypes,
  openConfirmDelete,
  openEditContact,
} from '../../redux/modal/slice';
import ModalWindow from '../Modal/Modal';
import {
  selectContentModal,
  selectTypeModal,
} from '../../redux/modal/selectors';
import { useEffect, useState } from 'react';
import { deleteContact, patchContact } from '../../redux/contacts/operations';
import EditForm from '../Modal/EditForm';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
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
      <ModalWindow onSuccess={onSuccess}>
        {type === modalTypes.editContact && (
          <EditForm
            editedContact={editedContact}
            handleEditChange={handleEditChange}
          />
        )}

        {type === modalTypes.confirmDelete && (
          <p>Are you sure you want to delete this contact?</p>
        )}
      </ModalWindow>
    </div>
  );
};

export default Contact;
