import { Container } from '@mui/material';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './../common';
import { AddInventory, Billing, Customer, Dashboard, Inventory, Login } from './../pages';

export const App = () => {
  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Header />
      <Container style={{ height: '85vh' }}>
        <Outlet />
      </Container>
    </Container>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/customer', element: <Customer /> },
      { path: '/billing', element: <Billing /> },
      {
        path: '/inventory',
        element: <Inventory />,
      },
      { path: '/inventory/add', element: <AddInventory /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
