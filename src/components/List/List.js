import { ListContact } from '../ListContact/ListContact';
import { ListStyle, ItemStyle } from './List.styled';

export const List = ({ items, onDeleteContact }) => {
  return (
    <ListStyle>
      {items.map((item, id) => (
        <ItemStyle key={id}>
          <ListContact item={item} onDeleteContact={onDeleteContact} />
        </ItemStyle>
      ))}
    </ListStyle>
  );
};
