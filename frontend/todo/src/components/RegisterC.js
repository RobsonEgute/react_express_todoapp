import React, { useState } from 'react';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log('Form submitted:', { firstName, lastName, username, password });
  };

  const styles = {
    cont: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      marginTop: "50px"
  },
  button: {
    width: '20%'
  }
  }



  return (
    <div className="login-form-container" style={styles.cont}>
      <form onSubmit={handleSubmit} className="login-form border border-3 border-dark text-center w-50 h-100 p-3">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="First Name"
          className='d-block form-control'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br/>
        <input
          type="text"
          placeholder="Last Name"
          className='d-block form-control'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br/>
        <input
          type="text"
          placeholder="email"
          className='d-block form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br/>
        <input
          type="text"
          placeholder="Username"
          className='d-block form-control'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          className='d-block form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <button type="submit" style={styles.button}>Login</button>
        <br/>
        <p className='mt-2'>Already have an account? click here to <a href='http://localhost:3000/login'>sign in</a></p>
      </form>
    </div>
  );
};

export default RegistrationForm;