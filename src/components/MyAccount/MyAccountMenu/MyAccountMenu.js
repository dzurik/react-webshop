import React from 'react';

import classes from './MyAccountMenu.module.scss';
import MyAccountMenuItem from './MyAccountMenuItem/MyAccountMenuItem';
import { myaccount } from '../../../shared/routes';

const MyAccountMenu = (props) => {
  return (
    <div className={classes.Menu}>
      <ul>
        {myaccount.map((item) => {
          return (
            <MyAccountMenuItem
              key={item.title}
              title={item.title}
              link={item.link}
              linkRoute={item.linkRoute}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MyAccountMenu;
