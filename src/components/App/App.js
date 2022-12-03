import { Component } from 'react';
import { Form } from '../Form/Form';
import { List } from '../List/List';
import { nanoid } from 'nanoid';
import { Filter } from '../Filter/Filter';
import initialContact from 'contact.json';
import { Container, Wrapper, WrapperContact } from './App.styled';
import { GlobalStyle } from '../GlobalStyles.styled';
export class App extends Component {
  state = {
    contacts: initialContact,
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      }));
    }
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
        {' '}
        <Container>
          <Wrapper>
            <h1>Phonebook</h1>
            <Form onSubmit={this.addContact} />
          </Wrapper>
          <WrapperContact>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={this.changeFilter} />
            {contacts.length > 0 && (
              <List
                items={visibleContact}
                onDeleteContact={this.deleteContact}
              />
            )}
          </WrapperContact>
        </Container>
        <GlobalStyle />
      </>
    );
  }
}
