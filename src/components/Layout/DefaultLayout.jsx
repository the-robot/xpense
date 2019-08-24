import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import Credit from '../Credit';
import Header from '../Header';

// styling
import style from '../../styles/index.scss';

const DefaultLayout = ({children}) => (
  <React.Fragment>
    <Head>
      <link rel="icon" type="image/x-icon" href="./static/favicon.png" />
      <title>Xpense</title>
    </Head>

    <Header/>
    <Credit />

    <div  className={style.container}>
      {children}
    </div>
  </React.Fragment>
);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
