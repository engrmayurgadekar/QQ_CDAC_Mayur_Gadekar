import React, { useState } from 'react';
import Login from './LoginForm';
import Launcher from './Launcher';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <Launcher /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
