import React, { Component } from "react";
import ContactList from "./ContactList";
import Search from './Search';
import contacts from "./contacts.json";
import "./App.css";

class App extends Component {
  state = {
    contacts: contacts.slice(0, 5),
    query: ''
  };

  setQuery = query => {
    this.setState({
      query: query
    })
  }

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => {
        return contact.id !== contactId;
      })
    });
  };

  addContact = () => {
    const random = contacts[Math.floor(Math.random() * contacts.length)];

    // checking if in this.state.contacts we already have the random contact
    if (this.state.contacts.find(contact => contact.id === random.id)) {
      // checking if we have not yet added all the contacts
      if (this.state.contacts.length < contacts.length) {
        this.addContact();
      }
      return;
    }

    this.setState({
      contacts: [random, ...this.state.contacts]
    });
  };

  sortByName = () => {
    const sorted = [...this.state.contacts];
    sorted.sort((a, b) => a.name.localeCompare(b.name));

    this.setState({
      contacts: sorted
    });
  };

  sortByPop = () => {
    const sorted = this.state.contacts.slice();
    sorted.sort((a, b) => b.popularity - a.popularity);

    this.setState({
      contacts: sorted
    });
  };


  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.addContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPop}>Sort by popularity</button>

        <Search query={this.state.query} triggerSetQuery={this.setQuery} />

        <ContactList
          contacts={this.state.contacts}
          triggerDeleteContact={this.deleteContact}
          query={this.state.query}
        />
      </div>
    );
  }
}

export default App;
