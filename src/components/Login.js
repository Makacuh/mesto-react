import React from 'react';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handlePathChange = (newPath) => {props.onPathChange(newPath)};

  React.useEffect(() => {
    handlePathChange('/sign-in')
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
  e.preventDefault();
  props.onSignin(email, password);
}

return (
  <div>
    <form className="lohin" onSubmit={handleSubmit}>
      <h1 className="login__title">Вход</h1>
      <input
      type='email' onChange={handleEmailChange}
      className="login__item" value={email}
      id='signin-email'
      placeholder="Email" required />
      <input
      type='password' onChange={handlePasswordChange}
      className="login__item"  value={password}
      id='signin-password'
      placeholder="Password" required />
      <button type='submit' className='login__button'>Войти</button>
    </form>
  </div>
)
}

export default Login;