import {
  Title,
  SubTitle,
  Container,
  BorderBox,
  Content,
  AddButton,
  PlusStyle,
  Minus,
  ContactsBox,
} from './Home.styled';
import { Notify } from 'notiflix';
import { FormContact } from '../FormContact/FormContact';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import { Notification } from '../Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { getContcts, getFilter } from '../../redux/selectors';
import { addContact, deleteContact } from '../../redux/operations';
import { setFilter } from '../../redux/filterSlice';
import { useState } from 'react';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const contacts = useSelector(getContcts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const onAddContact = data => {
    const isName = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (!isName) {
      const contact = { ...data, color: getRandomHexColor() };
      dispatch(addContact(contact));
    } else {
      Notify.warning('You already have this contact');
    }
  };

  const getFilterContacts = () => {
    const normalizedContact = filter?.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedContact);
    });
  };

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const removeContact = contactId => {
    dispatch(deleteContact(contactId));

    Notify.failure('Contact deleted');
  };

  return (
    <>
      <Container>
        <BorderBox>
          <Title>Phonebook</Title>
          <Filter
            value={filter}
            disabled={contacts.length === 0}
            onChange={changeFilter}
          />
          <Content>
            <SubTitle>Contacts</SubTitle>
            {showForm && <FormContact onSubmitHandle={onAddContact} />}
            <ContactsBox>
              {getFilterContacts().length > 0 ? (
                <Contacts
                  contacts={getFilterContacts()}
                  onClickDelete={removeContact}
                />
              ) : (
                <Notification
                  message={
                    contacts.length > 0 ? 'There is no match' : 'No contacts'
                  }
                />
              )}
            </ContactsBox>
            <AddButton type="button" onClick={() => setShowForm(!showForm)}>
              {!showForm ? <PlusStyle /> : <Minus />}
            </AddButton>
          </Content>
        </BorderBox>
      </Container>
    </>
  );
};
