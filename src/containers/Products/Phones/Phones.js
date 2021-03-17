import React from 'react';
import classes from './Phones.module.scss';
import Products from '../Products/Products';
import PhonesFilters from './PhonesFilters/PhonesFilters';

const Phones = (props) => {
  return (
    <div className={classes.Phones}>
      <div className={classes.PhoneFilters}>
        <PhonesFilters />
      </div>
      <div className={classes.PhoneProducts}>
        <div>Home / Phones</div>
        <Products title="Phones" menu="phones" />
      </div>
    </div>
  );
};

export default Phones;
