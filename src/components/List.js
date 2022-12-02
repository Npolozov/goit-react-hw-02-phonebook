export const List = ({ items, onDeleteContact }) => {
  return (
    <ul>
      {items.map(({ name, number }, id) => (
        <li key={id}>
          <p>
            {name}: <span>{number}</span>
          </p>
          <button onClick={() => onDeleteContact(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
