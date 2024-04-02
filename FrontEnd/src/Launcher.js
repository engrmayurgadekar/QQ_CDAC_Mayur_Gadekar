



// import React, { useState, useEffect } from 'react';
// import { w3cwebsocket } from 'websocket';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

// const ws = new w3cwebsocket('ws://localhost:8080');

// function Launcher(props) {
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState({});
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const [messageCounts, setMessageCounts] = useState({});

//   useEffect(() => {
   
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'registered') {
//         setIsLoggedIn(true);
//       } else if (data.type === 'message') {
//         setReceivedMessages((prevMessages) => {
//           const updatedMessages = { ...prevMessages };
//           updatedMessages[data.from] = [...(updatedMessages[data.from] || []), data];
//           return updatedMessages;
//         });
//         // Increment message count for the sender
//         setMessageCounts((prevCounts) => {
//           const updatedCounts = { ...prevCounts };
//           updatedCounts[data.from] = (updatedCounts[data.from] || 0) + 1;
//           return updatedCounts;
//         });
//       } else if (data.type === 'recipients') {
//         setRecipients(data.recipients);
//       }
//     };
//   }, []);

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleRecipientClick = (recipientId) => {
//     setSelectedRecipient(recipientId);
  
//     // Clear message count for the selected recipient
//     setMessageCounts((prevCounts) => {
//       const updatedCounts = { ...prevCounts };
//       updatedCounts[recipientId] = "";
//       return updatedCounts;
//     });
//   };

//   const sendMessage = () => {
//     if (!selectedRecipient) {
//       alert('Please select a recipient.');
//       return;
//     }

//     // Update receivedMessages for the sender
//     setReceivedMessages((prevMessages) => {
//       const updatedMessages = { ...prevMessages };
//       updatedMessages[selectedRecipient] = [...(updatedMessages[selectedRecipient] || []), { from: username, content: message, sender: true }];
//       return updatedMessages;
//     });

//     // Update receivedMessages for the receiver
//     setReceivedMessages((prevMessages) => {
//       const updatedMessages = { ...prevMessages };
//       updatedMessages[username] = [...(updatedMessages[username] || []), { from: username, content: message, sender: false }];
//       return updatedMessages;
//     });

//     // Reset message count for the receiver
//     setMessageCounts((prevCounts) => {
//       const updatedCounts = { ...prevCounts };
//       updatedCounts[selectedRecipient] = 0;
//       return updatedCounts;
//     });

//     ws.send(JSON.stringify({ type: 'message', to: selectedRecipient, from: username, content: message }));
//     setMessage('');
//   };

//   return (
//     <Container fluid className="launcher-container">
      
//         <Row className="h-100">
//           {/* Sidebar with list of recipients */}
//           <Col xs={3} md={2} className="p-0 bg-light">
//             <ListGroup>
//               {recipients.map((recipient) => (
//                 <ListGroup.Item
//                   key={recipient}
//                   action
//                   active={selectedRecipient === recipient}
//                   onClick={() => handleRecipientClick(recipient)} // Corrected onClick event binding
//                   className={selectedRecipient === recipient ? "bg-light text-dark" : "text-dark"}
//                 >
//                   {recipient}
//                   {messageCounts[recipient] && <span className="badge badge-danger text-dark">{messageCounts[recipient]}</span>}
//                   {username === recipient && <span className="float-right">(You)</span>}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Col>
//           {/* Main chat area */}
//           <Col xs={9} md={10} className="p-0">
//             {selectedRecipient && (
//               <div className="chat-container">
//                 <div className="chat-header p-3 rounded-top bg-primary text-white">
//                   <h3 className="m-0">Chat with {selectedRecipient}</h3>
//                   {selectedRecipient === username && <p className="m-0 text-right">(You)</p>}
//                 </div>
//                 <div className="chat-body">
//                   <div className="message-list p-3">
//                     {receivedMessages[selectedRecipient]?.map((msg, index) => (
//                       <div key={index} className={`message ${msg.from === username ? 'sent' : 'received'} bg-light border p-2 rounded mb-2`}>
//                         <p className="m-0">{msg.content}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <Form className="message-form p-3 border-top">
//                     <Form.Group controlId="formMessage" className="mb-0">
//                       <Form.Control type="text" placeholder="Type a message..." value={message} onChange={handleMessageChange} className="mb-2" />
//                     </Form.Group>
//                     <Button variant="primary" onClick={sendMessage} className="mt-2">Send</Button>
//                   </Form>
//                 </div>
//               </div>
//             )}
//           </Col>
//         </Row>
      
//     </Container>
//   );
// }

// export default Launcher;


















import React, { useState, useEffect } from 'react';
import { w3cwebsocket } from 'websocket';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';


const ws = new w3cwebsocket('ws://localhost:8080');

function Launcher() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState({});
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [messageCounts, setMessageCounts] = useState({});

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'registered') {
        setIsLoggedIn(true);
      } else if (data.type === 'message') {
        setReceivedMessages((prevMessages) => {
          const updatedMessages = { ...prevMessages };
          updatedMessages[data.from] = [...(updatedMessages[data.from] || []), data];
          return updatedMessages;
        });
        // Increment message count for the sender
        setMessageCounts((prevCounts) => {
          const updatedCounts = { ...prevCounts };
          updatedCounts[data.from] = (updatedCounts[data.from] || 0) + 1;
          return updatedCounts;
        });
      } else if (data.type === 'recipients') {
        setRecipients(data.recipients);
      }
    };
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username.trim() === '') {
      alert('Please enter a username.');
      return;
    }
    ws.send(JSON.stringify({ type: 'register', username }));
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleRecipientClick = (recipientId) => {
    setSelectedRecipient(recipientId);
  
    // Clear message count for the selected recipient
    setMessageCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      updatedCounts[recipientId] = "";
      return updatedCounts;
    });
  };
  
  



// Inside the component
const sendMessage = () => {
  if (!selectedRecipient) {
    alert('Please select a recipient.');
    return;
  }

  // Update receivedMessages for the sender
  setReceivedMessages((prevMessages) => {
    const updatedMessages = { ...prevMessages };
    updatedMessages[selectedRecipient] = [...(updatedMessages[selectedRecipient] || []), { from: username, content: message, sender: true }];
    return updatedMessages;
  });

  // Update receivedMessages for the receiver
  setReceivedMessages((prevMessages) => {
    const updatedMessages = { ...prevMessages };
    updatedMessages[username] = [...(updatedMessages[username] || []), { from: username, content: message, sender: false }];
    return updatedMessages;
  });

  // Reset message count for the receiver
  setMessageCounts((prevCounts) => {
    const updatedCounts = { ...prevCounts };
    updatedCounts[selectedRecipient] = 0;
    return updatedCounts;
  });

  ws.send(JSON.stringify({ type: 'message', to: selectedRecipient, from: username, content: message }));
  setMessage('');
};

// Inside the return statement
{receivedMessages[selectedRecipient]?.map((msg, index) => (
  <div
    key={index}
    className={`message ${msg.sender ? 'sent' : 'received'} bg-light border p-2 rounded mb-2`}
  >
    <p className="m-0">{msg.content}</p>
  </div>
))}


  return (
    <Container fluid className="launcher-container">
      {isLoggedIn ? (
        <Row className="h-100">
          {/* Sidebar with list of recipients */}
          <Col xs={3} md={2} className="p-0 bg-light">
            <ListGroup>
              {recipients.map((recipient) => (
                <ListGroup.Item
                key={recipient}
                action
                active={selectedRecipient === recipient}
                onClick={() => handleRecipientClick(recipient)} // Corrected onClick event binding
                className={selectedRecipient === recipient ? "bg-light text-dark" : "text-dark"}
              >
              
                 
                  {recipient}
                  {messageCounts[recipient] && <span className="badge badge-danger text-dark">{messageCounts[recipient]}</span>}
                  {username === recipient && <span className="float-right">(You)</span>}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          {/* Main chat area */}
          <Col xs={9} md={10} className="p-0">
            {selectedRecipient && (
              <div className="chat-container">
                <div className="chat-header p-3 rounded-top bg-primary text-white">
                  <h3 className="m-0">Chat with {selectedRecipient}</h3>
                  {selectedRecipient === username && <p className="m-0 text-right">(You)</p>}
                </div>
                <div className="chat-body">
                  <div className="message-list p-3">
                    {receivedMessages[selectedRecipient]?.map((msg, index) => (
                      <div key={index} className={`message ${msg.from === username ? 'sent' : 'received'} bg-light border p-2 rounded mb-2`}>
                        <p className="m-0">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                  <Form className="message-form p-3 border-top">
                    <Form.Group controlId="formMessage" className="mb-0">
                      <Form.Control type="text" placeholder="Type a message..." value={message} onChange={handleMessageChange} className="mb-2" />
                    </Form.Group>
                    <Button variant="primary" onClick={sendMessage} className="mt-2">Send</Button>
                  </Form>
                </div>
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center align-items-center h-100">
          <Col xs={12} md={6}>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Login</Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Launcher;











// import React, { useState, useEffect } from 'react';
// import { w3cwebsocket } from 'websocket';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';


// const ws = new w3cwebsocket('ws://localhost:8080');

// function Launcher() {
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState({});
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const [messageCounts, setMessageCounts] = useState({});

//   useEffect(() => {
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'registered') {
//         setIsLoggedIn(true);
//       } else if (data.type === 'message') {
//         setReceivedMessages((prevMessages) => {
//           const updatedMessages = { ...prevMessages };
//           updatedMessages[data.from] = [...(updatedMessages[data.from] || []), data];
//           return updatedMessages;
//         });
//         // Increment message count for the sender
//         setMessageCounts((prevCounts) => {
//           const updatedCounts = { ...prevCounts };
//           updatedCounts[data.from] = (updatedCounts[data.from] || 0) + 1;
//           return updatedCounts;
//         });
//       } else if (data.type === 'recipients') {
//         setRecipients(data.recipients);
//       }
//     };
//   }, []);

//   const handleLogin = (event) => {
//     event.preventDefault();
//     if (username.trim() === '') {
//       alert('Please enter a username.');
//       return;
//     }
//     ws.send(JSON.stringify({ type: 'register', username }));
//   };

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleRecipientClick = (recipientId) => {
//     setSelectedRecipient(recipientId);
  
//     // Clear message count for the selected recipient
//     setMessageCounts((prevCounts) => {
//       const updatedCounts = { ...prevCounts };
//       updatedCounts[recipientId] = "";
//       return updatedCounts;
//     });
//   };
  
  
//   // const sendMessage = () => {
//   //   if (!selectedRecipient) {
//   //     alert('Please select a recipient.');
//   //     return;
//   //   }
  
//   //   // Update receivedMessages for the sender
//   //   setReceivedMessages((prevMessages) => {
//   //     const updatedMessages = { ...prevMessages };
//   //     updatedMessages[selectedRecipient] = [...(updatedMessages[selectedRecipient] || []), { from: username, content: message }];
//   //     return updatedMessages;
//   //   });
  
//   //   // Reset message count for the receiver
//   //   setMessageCounts((prevCounts) => {
//   //     const updatedCounts = { ...prevCounts };
//   //     updatedCounts[selectedRecipient] = 0;
//   //     return updatedCounts;
//   //   });
  
//   //   ws.send(JSON.stringify({ type: 'message', to: selectedRecipient, from: username, content: message }));
//   //   setMessage('');
//   // };
  


// // Inside the component
// const sendMessage = () => {
//   if (!selectedRecipient) {
//     alert('Please select a recipient.');
//     return;
//   }

//   // Update receivedMessages for the sender
//   setReceivedMessages((prevMessages) => {
//     const updatedMessages = { ...prevMessages };
//     updatedMessages[selectedRecipient] = [...(updatedMessages[selectedRecipient] || []), { from: username, content: message, sender: true }];
//     return updatedMessages;
//   });

//   // Update receivedMessages for the receiver
//   setReceivedMessages((prevMessages) => {
//     const updatedMessages = { ...prevMessages };
//     updatedMessages[username] = [...(updatedMessages[username] || []), { from: username, content: message, sender: false }];
//     return updatedMessages;
//   });

//   // Reset message count for the receiver
//   setMessageCounts((prevCounts) => {
//     const updatedCounts = { ...prevCounts };
//     updatedCounts[selectedRecipient] = 0;
//     return updatedCounts;
//   });

//   ws.send(JSON.stringify({ type: 'message', to: selectedRecipient, from: username, content: message }));
//   setMessage('');
// };

// // Inside the return statement
// {receivedMessages[selectedRecipient]?.map((msg, index) => (
//   <div
//     key={index}
//     className={`message ${msg.sender ? 'sent' : 'received'} bg-light border p-2 rounded mb-2`}
//   >
//     <p className="m-0">{msg.content}</p>
//   </div>
// ))}


//   return (
//     <Container fluid className="launcher-container">
//       {isLoggedIn ? (
//         <Row className="h-100">
//           {/* Sidebar with list of recipients */}
//           <Col xs={3} md={2} className="p-0 bg-light">
//             <ListGroup>
//               {recipients.map((recipient) => (
//                 <ListGroup.Item
//                 key={recipient}
//                 action
//                 active={selectedRecipient === recipient}
//                 onClick={() => handleRecipientClick(recipient)} // Corrected onClick event binding
//                 className={selectedRecipient === recipient ? "bg-light text-dark" : "text-dark"}
//               >
              
                 
//                   {recipient}
//                   {messageCounts[recipient] && <span className="badge badge-danger text-dark">{messageCounts[recipient]}</span>}
//                   {username === recipient && <span className="float-right">(You)</span>}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Col>
//           {/* Main chat area */}
//           <Col xs={9} md={10} className="p-0">
//             {selectedRecipient && (
//               <div className="chat-container">
//                 <div className="chat-header p-3 rounded-top bg-primary text-white">
//                   <h3 className="m-0">Chat with {selectedRecipient}</h3>
//                   {selectedRecipient === username && <p className="m-0 text-right">(You)</p>}
//                 </div>
//                 <div className="chat-body">
//                   <div className="message-list p-3">
//                     {receivedMessages[selectedRecipient]?.map((msg, index) => (
//                       <div key={index} className={`message ${msg.from === username ? 'sent' : 'received'} bg-light border p-2 rounded mb-2`}>
//                         <p className="m-0">{msg.content}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <Form className="message-form p-3 border-top">
//                     <Form.Group controlId="formMessage" className="mb-0">
//                       <Form.Control type="text" placeholder="Type a message..." value={message} onChange={handleMessageChange} className="mb-2" />
//                     </Form.Group>
//                     <Button variant="primary" onClick={sendMessage} className="mt-2">Send</Button>
//                   </Form>
//                 </div>
//               </div>
//             )}
//           </Col>
//         </Row>
//       ) : (
//         <Row className="justify-content-center align-items-center h-100">
//           <Col xs={12} md={6}>
//             <Form onSubmit={handleLogin}>
//               <Form.Group controlId="formUsername">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">Login</Button>
//             </Form>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }

// export default Launcher;







// import React, { useState, useEffect } from 'react';
// import { w3cwebsocket } from 'websocket';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

// const ws = new w3cwebsocket('ws://localhost:8080');

// function Launcher() {
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState({});
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const [messageCounts, setMessageCounts] = useState({});

//   useEffect(() => {
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'registered') {
//         setIsLoggedIn(true);
//       } else if (data.type === 'message') {
//         setReceivedMessages((prevMessages) => {
//           const updatedMessages = { ...prevMessages };
//           updatedMessages[data.from] = [...(updatedMessages[data.from] || []), data];
//           return updatedMessages;
//         });
//         // Increment message count for the sender
//         setMessageCounts((prevCounts) => {
//           const updatedCounts = { ...prevCounts };
//           updatedCounts[data.from] = (updatedCounts[data.from] || 0) + 1;
//           return updatedCounts;
//         });
//       } else if (data.type === 'recipients') {
//         setRecipients(data.recipients);
//       }
//     };
//   }, []);

//   const handleLogin = (event) => {
//     event.preventDefault();
//     if (username.trim() === '') {
//       alert('Please enter a username.');
//       return;
//     }
//     ws.send(JSON.stringify({ type: 'register', username }));
//   };

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleRecipientClick = (recipientId) => {
//     setSelectedRecipient(recipientId);
  
//     // Clear message count for the selected recipient
//     setMessageCounts((prevCounts) => {
//       const updatedCounts = { ...prevCounts };
//       updatedCounts[recipientId] = "";
//       return updatedCounts;
//     });
//   };
  
  

//   const sendMessage = () => {
//     if (!selectedRecipient) {
//       alert('Please select a recipient.');
//       return;
//     }
//     ws.send(JSON.stringify({ type: 'message', to: selectedRecipient, from: username, content: message }));
//     setMessage('');
//   };

//   return (
//     <Container fluid className="launcher-container">
//       {isLoggedIn ? (
//         <Row className="h-100">
//           {/* Sidebar with list of recipients */}
//           <Col xs={3} md={2} className="p-0 bg-light">
//             <ListGroup>
//               {recipients.map((recipient) => (
//                 <ListGroup.Item
//                 key={recipient}
//                 action
//                 active={selectedRecipient === recipient}
//                 onClick={() => handleRecipientClick(recipient)} // Corrected onClick event binding
//                 className={selectedRecipient === recipient ? "bg-light text-dark" : "text-dark"}
//               >
              
                 
//                   {recipient}
//                   {messageCounts[recipient] && <span className="badge badge-danger text-dark">{messageCounts[recipient]}</span>}
//                   {username === recipient && <span className="float-right">(You)</span>}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Col>
//           {/* Main chat area */}
//           <Col xs={9} md={10} className="p-0">
//             {selectedRecipient && (
//               <div className="chat-container">
//                 <div className="chat-header p-3 rounded-top bg-primary text-white">
//                   <h3 className="m-0">Chat with {selectedRecipient}</h3>
//                   {selectedRecipient === username && <p className="m-0 text-right">(You)</p>}
//                 </div>
//                 <div className="chat-body">
//                   <div className="message-list p-3">
//                     {receivedMessages[selectedRecipient]?.map((msg, index) => (
//                       <div key={index} className={`message ${msg.from === username ? 'sent' : 'received'} bg-light border p-2 rounded mb-2`}>
//                         <p className="m-0">{msg.content}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <Form className="message-form p-3 border-top">
//                     <Form.Group controlId="formMessage" className="mb-0">
//                       <Form.Control type="text" placeholder="Type a message..." value={message} onChange={handleMessageChange} className="mb-2" />
//                     </Form.Group>
//                     <Button variant="primary" onClick={sendMessage} className="mt-2">Send</Button>
//                   </Form>
//                 </div>
//               </div>
//             )}
//           </Col>
//         </Row>
//       ) : (
//         <Row className="justify-content-center align-items-center h-100">
//           <Col xs={12} md={6}>
//             <Form onSubmit={handleLogin}>
//               <Form.Group controlId="formUsername">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">Login</Button>
//             </Form>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }

// export default Launcher;







// import React, { useState, useEffect } from 'react';
// import { w3cwebsocket } from 'websocket';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

// const ws = new w3cwebsocket('ws://localhost:8080');

// function Launcher() {
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState({});
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const [messageCounts, setMessageCounts] = useState({});

//   useEffect(() => {
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'registered') {
//         setIsLoggedIn(true);
//       } else if (data.type === 'message') {
//         setReceivedMessages((prevMessages) => {
//           const updatedMessages = { ...prevMessages };
//           updatedMessages[data.from] = [...(updatedMessages[data.from] || []), data.content];
//           return updatedMessages;
//         });
//         // Increment message count for the sender
//         setMessageCounts((prevCounts) => {
//           const updatedCounts = { ...prevCounts };
//           updatedCounts[data.from] = (updatedCounts[data.from] || 0) + 1;
//           return updatedCounts;
//         });
//       } else if (data.type === 'recipients') {
//         setRecipients(data.recipients);
//       }
//     };
//   }, []);

//   const handleLogin = (event) => {
//     event.preventDefault();
//     if (username.trim() === '') {
//       alert('Please enter a username.');
//       return;
//     }
//     ws.send(JSON.stringify({ type: 'register', username }));
//   };

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleRecipientClick = (recipientId) => {
//     setSelectedRecipient(recipientId);
  
//     // Clear message count for the selected recipient
//     setMessageCounts((prevCounts) => {
//       const updatedCounts = { ...prevCounts };
//       updatedCounts[recipientId] = "";
//       return updatedCounts;
//     });
//   };
  

//   const sendMessage = () => {
//     if (!selectedRecipient) {
//       alert('Please select a recipient.');
//       return;
//     }
//     ws.send(JSON.stringify({ type: 'message', to: selectedRecipient, from: username, content: message }));
//     setMessage('');
//   };

//   const handleMessageSubmit = (event) => {
//     event.preventDefault();
//     sendMessage();
//   };

//   return (
//     <Container fluid className="launcher-container">
//       {isLoggedIn ? (
//         <Row className="h-100">
//           {/* Sidebar with list of recipients */}
//           <Col xs={3} md={2} className="p-0 bg-light">
//             <ListGroup>
//               {recipients.map((recipient) => (
//                 <ListGroup.Item
//                   key={recipient}
//                   action
//                   active={selectedRecipient === recipient}
//                   onClick={() => handleRecipientClick(recipient)}
//                 >
//                   {recipient}
//                   {username === recipient && <span className="float-right">(You)</span>}
//                   {messageCounts[recipient] && <span className="badge badge-primary ml-2">{messageCounts[recipient]}</span>}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Col>
//           {/* Main chat area */}
//           <Col xs={9} md={10} className="p-0">
//             {selectedRecipient && (
//               <div className="chat-container">
//                 <div className="chat-header p-3 rounded-top bg-primary text-white">
//                   <h3 className="m-0">Chat with {selectedRecipient}</h3>
//                   {selectedRecipient === username && <p className="m-0 text-right">(You)</p>}
//                 </div>
//                 <div className="chat-body">
//                   <div className="message-list p-3">
//                     {receivedMessages[selectedRecipient]?.map((msg, index) => (
//                       <div key={index} className="message received bg-light border p-2 rounded mb-2">
//                         <p className="m-0">{msg}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <Form className="message-form p-3 border-top" onSubmit={handleMessageSubmit}>
//                     <Form.Group controlId="formMessage" className="mb-0">
//                       <Form.Control
//                         type="text"
//                         placeholder="Type a message..."
//                         value={message}
//                         onChange={handleMessageChange}
//                         className="mb-2"
//                       />
//                     </Form.Group>
//                     <Button variant="primary" type="submit" className="mt-2">Send</Button>
//                   </Form>
//                 </div>
//               </div>
//             )}
//           </Col>
//         </Row>
//       ) : (
//         <Row className="justify-content-center align-items-center h-100">
//           <Col xs={12} md={6}>
//             <Form onSubmit={handleLogin}>
//               <Form.Group controlId="formUsername">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">Login</Button>
//             </Form>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }

// export default Launcher;








// import React, { useState, useEffect } from 'react';
// import { w3cwebsocket } from 'websocket';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

// const ws = new w3cwebsocket('ws://localhost:8080');

// function Launcher() {
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState({});
//   const [recipients, setRecipients] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);

//   useEffect(() => {
//     ws.onopen = () => {
//       console.log('WebSocket connected');
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'registered') {
//         setIsLoggedIn(true);
//       } else if (data.type === 'message') {
//         setReceivedMessages(prevMessages => {
//           const updatedMessages = { ...prevMessages };
//           updatedMessages[data.from] = [...(updatedMessages[data.from] || []), data.content];
//           return updatedMessages;
//         });
//       } else if (data.type === 'recipients') {
//         setRecipients(data.recipients);
//       }
//     };

//     ws.onclose = () => {
//       console.log('WebSocket disconnected');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const handleLogin = (event) => {
//     event.preventDefault();
//     if (username.trim() === '') {
//       alert('Please enter a username.');
//       return;
//     }
//     ws.send(JSON.stringify({ type: 'register', username }));
//   };

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleRecipientClick = (recipientId) => {
//     setSelectedRecipient(recipientId);
//   };

//   const sendMessage = () => {
//     if (!selectedRecipient) {
//       alert('Please select a recipient.');
//       return;
//     }
//     ws.send(JSON.stringify({ type: 'message', to: selectedRecipient, from: username, content: message }));
//     setMessage('');
//   };

//   return (
//     <Container fluid className="launcher-container">
//       {!isLoggedIn ? (
//         <Row className="justify-content-center align-items-center h-100">
//           <Col xs={12} md={6}>
//             <Form onSubmit={handleLogin}>
//               <Form.Group controlId="formUsername">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">Login</Button>
//             </Form>
//           </Col>
//         </Row>
//       ) : (
//         <Row className="h-100">
//           {/* Sidebar with list of recipients */}
//           <Col xs={3} md={2} className="p-0 bg-light">
//             <ListGroup>
//               {recipients.map((recipient) => (
//                 <ListGroup.Item
//                   key={recipient}
//                   action
//                   active={selectedRecipient === recipient}
//                   onClick={() => handleRecipientClick(recipient)}
//                 >
//                   {recipient}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Col>
//           {/* Main chat area */}
//           <Col xs={9} md={10} className="p-0">
//             {selectedRecipient && (
//               <div className="chat-container">
//                 <div className="chat-header p-3 rounded-top bg-primary text-white">
//                   <h3 className="m-0">Chat with {selectedRecipient}</h3>
//                 </div>
//                 <div className="chat-body">
//                   <div className="message-list p-3">
//                     {receivedMessages[selectedRecipient]?.map((msg, index) => (
//                       <div key={index} className="message received bg-light border p-2 rounded mb-2">
//                         <p className="m-0">{msg}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <Form className="message-form p-3 border-top">
//                     <Form.Group controlId="formMessage" className="mb-0">
//                       <Form.Control type="text" placeholder="Type a message..." value={message} onChange={handleMessageChange} className="mb-2" />
//                     </Form.Group>
//                     <Button variant="primary" onClick={sendMessage} className="mt-2">Send</Button>
//                   </Form>
//                 </div>
//               </div>
//             )}
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }

// export default Launcher;




