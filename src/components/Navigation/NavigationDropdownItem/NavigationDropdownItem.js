import React, { useState } from 'react';

import classes from './NavigationDropdownItem.module.scss';
import { NavLink } from 'react-router-dom';
import DropDownItem from './DropDownItem/DropDownItem';

const NavigationDropdownItem = (props) => {
  const [show, setShow] = useState(false);

  let dropdownClasses = [classes.DropDown];
  if (show) {
    dropdownClasses.push(classes.Show);
  }

  return (
    <React.Fragment>
      <li
        className={classes.NavigationDropdownItem}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <NavLink activeClassName={classes.active} to={props.link}>
          {props.children}
        </NavLink>
        <ul className={dropdownClasses.join(' ')}>
          {props.itemList.map((item) => {
            return (
              <DropDownItem
                key={item.title}
                title={item.title}
                link={item.link}
                linkRoute={item.linkRoute}
              >
                {props.children}
              </DropDownItem>
            );
          })}
        </ul>
      </li>
    </React.Fragment>
  );
};

export default NavigationDropdownItem;
