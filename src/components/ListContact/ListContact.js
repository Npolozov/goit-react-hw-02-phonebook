import { Button } from './ListContact.styled';

export function ListContact({ item: { name, number, id }, onDeleteContact }) {
  return (
    <>
      <p>
        {name}: <span>{number}</span>
      </p>
      <Button onClick={() => onDeleteContact(id)}>Delete</Button>
    </>
  );
}
