import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log('Form submitted:', { username, password });
  };

  const styles = {
    cont: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      marginTop: "150px"
  },
  button: {
    width: '20%'
  }
  }

  return (
    <div className="login-form-container" style={styles.cont}>
      <form onSubmit={handleSubmit} className="login-form border border-3 border-dark text-center w-50 h-100 p-3">
        <h2>Login</h2>
        <br/>
        <input
          type="text"
          className='d-block form-control'
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br/>
        <input
          type="password"
          className='d-block form-control'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <button type="submit" className='btn btn-primary w-20' style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;