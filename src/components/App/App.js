import { Component } from 'react';
import { ContactForm } from '../Form/Form';
import { List } from '../List/List';
import { nanoid } from 'nanoid';
import { Filter } from '../Filter/Filter';
import {
  Container,
  Wrapper,
  WrapperContact,
  Title,
  Button,
} from './App.styled';
import { GlobalStyle } from '../GlobalStyles.styled';
import { OpenModal } from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
  static defaultProps = {
    initialStickers: [],
  };

  state = {
    contacts: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const contact = localStorage.getItem('contact');
    const parseContact = JSON.parse(contact);

    if (parseContact) {
      this.setState({ contacts: parseContact });
    } else {
      this.setState({ contacts: this.props.initialStickers });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
    // if (
    //   this.state.contacts.length > prevState.contacts.length &&
    //   prevState.contacts.length !== 0
    // ) {
    //   this.toggleModal();
    // }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts.`);
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
    this.toggleModal();
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { contacts, filter, showModal } = this.state;
    const lenghtContactts = contacts.length;
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <>
        <Container>
          <Wrapper>
            <Button type="button" onClick={this.toggleModal}>
              Add Contact
            </Button>
            {showModal && (
              <OpenModal onClose={this.toggleModal}>
                <Title>Phonebook</Title>
                <ContactForm onSubmit={this.addContact} />
              </OpenModal>
            )}
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
          <ToastContainer autoClose={2000} position="top-right" />
        </Container>
        <GlobalStyle />
      </>
    );
  }
}
