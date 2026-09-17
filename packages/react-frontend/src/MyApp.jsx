// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
  
function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}
  useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

  function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}
  
    function removeOneCharacter(id) {
  fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status !== 204) {
        throw new Error(`Expected status 204, received ${res.status}`);
      }

      setCharacters((currentCharacters) =>
        currentCharacters.filter((character) => character.id !== id)
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

    function updateList(person) {
  postUser(person)
    .then((res) => {
      if (res.status !== 201) {
        throw new Error(`Expected status 201, received ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      setCharacters([...characters, json]);
    })
    .catch((error) => {
      console.log(error);
    });
}

    return (
        <div className="container">
          <Table characterData={characters} removeCharacter={removeOneCharacter} />
          <Form handleSubmit={updateList} />
        </div>
      );
}

export default MyApp;


