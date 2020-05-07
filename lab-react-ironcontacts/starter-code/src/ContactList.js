import React from "react";

const ContactList = props => {

  const filtered = props.contacts.filter(contact => {
    return contact.name.toLowerCase().includes(props.query.toLowerCase()) ? true : false
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table
      >
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* filter the contacts by the `query` that is in the Search component */}
          {filtered.map(contact => {
            return (
              <tr key={contact.id}>
                <td>
                  <img
                    src={contact.pictureUrl}
                    height="100px"
                    alt={contact.name}
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>
                  <button onClick={() => { props.triggerDeleteContact(contact.id) }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
