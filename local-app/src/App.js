import React, { Suspense } from 'react';
import './App.css';
import { NotificationContainer } from 'react-notifications'
import Navbar from './components/navbar'
import Footer from './components/footer'
import '../node_modules/react-notifications/lib/notifications.css'
import RootContainer from './components/rootContainer'
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <NotificationContainer />
      <Suspense fallback={''}>
        <Navbar />
        <RootContainer />
        <Footer />
      </Suspense >
    </BrowserRouter>
  );
}

export default App;
