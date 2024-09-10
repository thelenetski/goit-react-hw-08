import { Suspense } from 'react';
import { AppBar } from './AppBar/AppBar';
import { Toaster } from 'react-hot-toast';
import Loader from './Loader/Loader';
// import ModalWindow from './Modal/Modal';
// import { useSelector } from 'react-redux';
// import { selectIsOpenModal } from '../redux/modal/selectors';

const style = {
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 960,
    margin: '0 auto',
    // padding: '0 16px',
  },
};

export const Layout = ({ children }) => {
  // const isOpen = useSelector(selectIsOpenModal);
  return (
    <div style={style.header}>
      <AppBar />
      <Toaster />
      {/* {isOpen && <ModalWindow />} */}
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};
