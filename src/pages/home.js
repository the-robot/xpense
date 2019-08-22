import React, { PureComponent } from 'react';

import Home from '../components/Home';
import Layout from '../components/Layout';

class HomePage extends PureComponent {
  render() {
    return (
      <Layout title="Home">
        <Home />
      </Layout>
    );
  }
}

export default HomePage;
