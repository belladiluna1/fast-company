import React, { useState } from 'react';
import { useParams } from 'react-router';
import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');
  const toggleFormType = () => {
    setFormType(prevState => prevState === 'register' ? 'login' : 'register');
  };

  return <>
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12 shadow p-4'>
          {formType === 'register'
            ? <>
              <h3 className='mb-4'>Register</h3>
              <RegisterForm />
              <p>Alredy have account? <a role='button' onClick={toggleFormType}>Sign In</a></p>
            </>
            : <>
              <h3 className='mb-4'>Login</h3>
              <LoginForm />
              <p>Dont have account? <a role='button' onClick={toggleFormType}>Sign Up</a></p>
            </>
          }
        </div>
      </div>
    </div>
  </>;
};

export default Login;
