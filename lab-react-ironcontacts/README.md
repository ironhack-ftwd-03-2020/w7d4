# Lifting state up

We have an App component that manages the list of contacts in the state and a ContactList component that renders the contact as a list. The ContactList gets a prop 'contacts'.

Now we want to add a button to the list in the ContactList component that, when pressed, deletes the contact from the list. Therefore we have to execute the delete function in the App component because that is where the state is managed.

#### First we add a new prop to the ContactList - a reference to the delete function

```js
// src/App.js
<ContactList
  contacts={this.state.contacts}
  deleteContact={this.deleteContact}
/>
```

#### Then we add the button to the ContactList - the onClick references a function that calles the function from the prop

```js
// src/ContactList.js
<button onClick={() => props.deleteContact(contact.id)}>
  Delete
</button>
```

Now let's add a search field to the top of the list that filters the list for whatever is typed in the search 

#### We create a new component SearchField

```bash
$ touch src/SearchField
```

The SearchFiels will display a form so the value in the form has to be connected to the state - but that is in the App component - so the value in the input is a prop

And the onChange handler also triggers a function that the SearchField receives as a prop

```js
import React, { Component } from 'react';

export default class SearchField extends Component {
  handleChange = event => {
    this.props.setQuery(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          type='text'
          name='query'
          value={this.props.query}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
```

This means in the App component we have to use the SearchField component with two props:
query - that will be the input in the search field
setQuery - that is the onChange handler from the input
#### Add query field to the state and the setQuery function to App.js
```js
// src/App.js

state = {
  contacts: contacts.slice(0, 5),
  query: ''
};

//
setQuery = query => {
  this.setState({
    query: query
  });
};


<div className='App'>
  <h1>IronContacts</h1>
  <button onClick={this.addContact}>Add Random Contact</button>
  <button onClick={this.sortByName}>Sort by name</button>
  <button onClick={this.sortByPopularity}>Sort by popularity</button>

  // Added SearchField
  <SearchField setQuery={this.setQuery} query={this.state.query} />

  <ContactList
    contacts={this.state.contacts}
    deleteContact={this.deleteContact}
  />
</div>
```

Now we have to change to ContactList component because that should now render the filtered List depending on what is the current value of query in the state of App.js

#### Hand in query as a prop to ContactList
```js
// src/App.js
<ContactList
  contacts={this.state.contacts}
  deleteContact={this.deleteContact}
  query={this.state.query}
/>
```

Now in the render() of ContactList we don't want to map over props.contact anymore but create a filtered list based on the prop query

```js
src/ContactList.js
import React from 'react';

const ContactList = props => {

  const filtered = props.contacts.filter(contact => {
    return contact.name.toLowerCase().includes(props.query.toLowerCase()) ? true : false
  });
  
  //

<tbody>
  {/* filter the contacts by the `query` that is in the Search component */}
  {filtered.map(contact => {
    return (
      <tr key={contact.id}>
      //
```