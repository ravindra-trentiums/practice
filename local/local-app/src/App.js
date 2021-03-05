import React, { Suspense } from 'react';
import './App.css';
import { NotificationContainer } from 'react-notifications'
import Navbar from './components/navbar'
import { Provider } from "react-redux";
import Footer from './components/footer'
import '../node_modules/react-notifications/lib/notifications.css'
import RootContainer from './components/rootContainer'
import { BrowserRouter } from 'react-router-dom'
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <BrowserRouter>
          <NotificationContainer />
          <Suspense fallback={''}>
            <Navbar />
            <RootContainer />
            <Footer />
          </Suspense >
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
