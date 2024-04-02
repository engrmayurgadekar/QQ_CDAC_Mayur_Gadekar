import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import Launcher from './Launcher';

const LoginForm = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const history = useHistory(); // Initialize useHistory

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usernameInput.trim() === '') {
      alert('Please enter a username.');
      return;
    }

    setUsername(usernameInput); // Set username
    setIsLoggedIn(true); // Set isLoggedIn to true
  };

  // Render Launcher component if user is logged in
  if (isLoggedIn) {
    return <Launcher username={usernameInput} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>Login</Button>
    </Form>
  );
};

export default LoginForm;



// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom'; // Import useHistory hook
// import Launcher from './Launcher';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//   const history = useHistory(); // Initialize useHistory

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (username.trim() === '') {
//       alert('Please enter a username.');
//       return;
//     }

//     setIsLoggedIn(true); // Set isLoggedIn to true
//   };

//   // Render Launcher component if user is logged in
//   if (isLoggedIn) {
//     return <Launcher  />;
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formUsername">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit" block>Login</Button>
//     </Form>
//   );
// };

// export default LoginForm;









// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const LoginForm = ({ onLogin }) => {
//   const [username, setUsername] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (username.trim() === '') {
//       alert('Please enter a username.');
//       return;
//     }
//     onLogin(); // Call the onLogin function
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formUsername">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit" block>Login</Button>
//     </Form>
//   );
// };

// export default LoginForm;
