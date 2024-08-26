import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filters/selectors';
import { selectLoading } from '../../redux/contacts/selectors';
import Loader from '../Loader/Loader';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  return (
    <div className={css.contactList}>
      {loading && <Loader />}
      {!loading && (
        <ul>
          {contacts.length > 0 &&
            contacts.map(user => {
              return (
                <li key={user.id}>
                  <Contact contact={user} />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
