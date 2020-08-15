import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/home/Home';
import ListPage from './components/list/ListPage';
import MyListsSection from './components/myLists/MyListsSection/MyListsSection';
import ContextProvider from './context/UserContext';
import Nav from './components/shared/Nav/Nav';
import Footer from './components/shared/Footer/Footer';
import NotFound from './components/shared/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <ContextProvider>
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/list' exact component={ListPage} />
          <Route path='/my-lists' exact component={MyListsSection} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </ContextProvider>
    </Router>
  );
};

export default App;
