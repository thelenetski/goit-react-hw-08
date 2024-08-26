import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import { TextField } from '@mui/material';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterName = useSelector(selectNameFilter);

  const onFilter = value => {
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.searchBox}>
      <p>Сontact search</p>
      <TextField
        fullWidth
        id="search"
        name="search"
        label="Search"
        type="text"
        value={filterName}
        onChange={e => onFilter(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
    </div>
  );
};

export default SearchBox;
