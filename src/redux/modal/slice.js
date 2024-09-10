import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { patchContact, deleteContact } from '../contacts/operations';

export const modalTypes = {
  editContact: 'edit-contact',
  confirmDelete: 'confirm-delete',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    content: null,
  },
  reducers: {
    openEditContact(state, action) {
      state.isOpen = true;
      state.type = modalTypes.editContact;
      state.content = action.payload;
    },
    openConfirmDelete(state, action) {
      state.isOpen = true;
      state.type = modalTypes.confirmDelete;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(patchContact.fulfilled, deleteContact.fulfilled),
      state => {
        state.isOpen = false;
        state.type = null;
        state.content = null;
      }
    );
  },
});

// Експортуємо генератори екшенів та редюсер
export const { openConfirmDelete, openEditContact, closeModal } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
