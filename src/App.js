import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from './component/Container';
import { Routing } from './component/Routing/router';

import { Menu } from './component/Menu';
import { Footer } from './component/Footer';


export const App = () => {

 
  return (
    <Router>
      <Menu />
      <Container>
        <Routing />
      </Container>
      <Footer />
    </Router>

  );
}

