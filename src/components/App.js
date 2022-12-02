import { Component } from 'react';
import { Form } from './Form';
import { List } from './List';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';
import initialContact from './contact.json';
export class App extends Component {
  state = {
    contacts: initialContact,
    filter: '',
  };

  addContact = ({ name, number }) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    console.log(contactId);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    // const lenghtContactts = contacts.length;
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        {contacts.length > 0 && (
          <List items={visibleContact} onDeleteContact={this.deleteContact} />
        )}
      </>
    );
  }
}
