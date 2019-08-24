import React from 'react';

// styling
import style from '../../styles/components/credit.scss';

const Credit = () => {
  const githubRepo = 'https://github.com/the-robot/xpense';

  return (
    <React.Fragment>
      <a href={githubRepo} target='_blank'>
        <div className={style.container}>
          <img src='./static/github.png' alt='github' />
        </div>
      </a>
    </React.Fragment>
  );
};

export default Credit;