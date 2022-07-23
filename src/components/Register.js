import React, { useEffect, useState } from "react";
import GoogleForm from "./GoogleForm";

const RegisterPage = () => {
  const [database, setDatabase] = useState({});
  const [state, setState] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const db = localStorage.getItem("database");
    if (db) {
      setDatabase(JSON.parse(db));
    }
  }, []);

  // When database state changes, update localstorage
  useEffect(() => {
    localStorage.setItem('database',
    JSON.stringify(
      database
    )
  );
  }, [database])
  

  // TODO: Create a function that checks for duplicate email addresses in the database.
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = database.users || [];
    setDatabase(prevState => ({...prevState, users: [...users, state],}))
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setState({ ...state, [id]: value });
  };

  return (
    <div>
      <div>RegisterPage</div>
      <GoogleForm />
      <form onSubmit={handleSubmit}>
        <input
          value={state.name}
          id="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          value={state.number}
          id="number"
          placeholder="number"
          onChange={handleChange}
        />
        <input
          value={state.email}
          id="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          value={state.password}
          id="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
