import { Wrapper } from './Filter.styled';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <Wrapper>
      <label>Find contacts by name</label>
      <input value={value} onChange={onChange}></input>
    </Wrapper>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
