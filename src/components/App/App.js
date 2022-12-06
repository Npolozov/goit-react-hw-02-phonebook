import { Component } from 'react';
import { ContactForm } from '../Form/Form';
import { List } from '../List/List';
import { nanoid } from 'nanoid';
import { Filter } from '../Filter/Filter';
import initialContact from 'contact.json';
import { Container, Wrapper, WrapperContact, Title } from './App.styled';
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
      const contact = {
        name,
        number,
        id: nanoid(),
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
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
    const lenghtContactts = contacts.length;
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <>
        <Container>
          <Wrapper>
            <Title>Phonebook</Title>
            <ContactForm onSubmit={this.addContact} />
          </Wrapper>
          <WrapperContact>
            <p>Total contacts: {lenghtContactts}</p>
            <Title>Contacts</Title>
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
