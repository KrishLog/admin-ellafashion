import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { H1 } from '../../common';
import { BASE_URL } from '../../config/server';
import useAuth from '../../context/auth/auth-context';

export const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    mode: 'onChange',
  });
  const navigate = useNavigate();

  localStorage.clear();

  const onSubmit = (data: any) => {
    // login(data.userName, data.password);

    axios.post(BASE_URL + 'auth/login', data).then((response) => {
      if (response.data.accessToken?.length > 0) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/inventory');
      } else {
        throw new Error('Invalid Credentials');
      }
    });
  };
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex items-center justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start ">
            <H1 className="text-3xl font-bold tracking-tight">Login</H1>
          </div>
          <div></div>
        </div>
      </header>
      <main>
        <Box component="form" noValidate autoComplete="off" sx={{ m: 1, width: '40ch' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                sx={{ mt: 3 }}
                fullWidth
                required
                defaultValue=""
                label="User Name"
                inputProps={register('userName', {
                  required: 'Please enter user name',
                })}
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
              />
            </div>
            <div>
              <TextField
                sx={{ mt: 3 }}
                required
                fullWidth
                type="password"
                defaultValue=""
                label="Password"
                inputProps={register('password', {
                  required: 'Please enter password',
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </div>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ mt: 3 }}>
              submit
            </Button>
          </form>
        </Box>
      </main>
    </>
  );
};

export default Login;
