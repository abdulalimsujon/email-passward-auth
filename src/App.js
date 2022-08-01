import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap";
import './App.css';
import app from "./firebase.init";
import { useState } from "react";



const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [register, setRegister] = useState(false);
  const [error, setError] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');


  const emailBlur = (event) => {
    setMail(event.target.value);

  }

  const passwordBlur = (event) => {
    setPassword(event.target.value);
  }
  const handleRegisterChange = (event) => {
    setRegister(event.target.checked);


  }
  const formSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain at least one special character');
      return;

    }
    setValidated(true);
    setError('');

    if (register) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          setError(error.message);
        })

    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setMail('');
          setPassword('');
          veryfyEmail();
        })
        .catch(error => {
          setError('Already have an account');
        })

    }



  }
  const veryfyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification send');
      })
  }

  const hundlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Reset done');
      })

  }


  return (
    <div className="registration w-50 mx-auto mt-5">
      <h2 className='my-5 text-primary'>please !!!{register ? 'Login' : 'Register'}</h2>
      <Form noValidate validated={validated} onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={emailBlur} type="email" placeholder="Enter email" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={passwordBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <p className="text-danger">{error}</p>
        <Form.Group className="mb-3 text-success">
          <Form.Check
            onChange={handleRegisterChange}
            type="checkbox"
            id="disabledFieldsetCheck"
            label="Already registered?"
          />
        </Form.Group>
        <Button onClick={hundlePasswordReset} variant='link'>Forget Password? Reset</Button>
        <br />
        <Button variant="primary" type="submit">
          {register ? 'Login' : 'Register'}
        </Button>
      </Form>



    </div>
  );
}

export default App;
