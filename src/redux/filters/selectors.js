import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../contacts/selectors';

export const selectNameFilter = state => state.filters.name;

/*-------------------------
По ТЗ треба було цей селектор додати у контактСлайс,
але вирішив зробити як у конспекті, бо наскільки я зрозумів логіку, то 
селектори повинні бути у файлі селекторс. Сподіваюсь Ви не примите за помилку)
------------------------------*/
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return (
      contacts.length > 0 &&
      contacts.filter(contact => {
        return (
          contact.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
          contact.number.includes(nameFilter.toLowerCase())
        );
      })
    );
  }
);
