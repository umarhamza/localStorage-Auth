import React, { useEffect, useState } from "react";
import GoogleForm from "./GoogleForm";

const LoginPage = () => {
  const [database, setDatabase] = useState({});
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const db = localStorage.getItem("database");
    if (db) {
      setDatabase(JSON.parse(db));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(database));
  }, [database]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = state.email;

    if (database.users) {
      const loggedInUser = database.users.find((user) => user.email === email);
      setDatabase((prevState) => ({ ...prevState, loggedInUser }));
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setState({ ...state, [id]: value });
  };

  const handleLogout = () => {
    setDatabase((prevState) => ({ ...prevState, loggedInUser: null }));
  };

  return (
    <div>
      <div>LoginPage</div>
      <GoogleForm />
      {database.loggedInUser && (
        <div>
          <p>You are logged in as {database.loggedInUser.email}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input id="email" placeholder="email" onChange={handleChange} />
        <input
          id="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
      {database.loggedInUser && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
