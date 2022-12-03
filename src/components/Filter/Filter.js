import { Wrapper } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <Wrapper>
      <label>Find contacts by name</label>
      <input value={value} onChange={onChange}></input>
    </Wrapper>
  );
};
