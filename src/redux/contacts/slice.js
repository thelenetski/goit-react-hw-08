import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  patchContact,
} from './operations';
import { logOut } from '../auth/operations';
import toast from 'react-hot-toast';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
        toast.success('Contact add successfully');
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
        toast.success('Contact delete successfully');
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(patchContact.pending, handlePending)
      .addCase(patchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.map(contact => {
          if (contact.id === action.payload.id) {
            return (contact = action.payload);
          }
          return contact;
        });
        console.log(state.items);
        toast.success('Contact update successfully');
      })
      .addCase(patchContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
