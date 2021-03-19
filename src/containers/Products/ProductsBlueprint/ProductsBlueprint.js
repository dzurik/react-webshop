import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductsBlueprint.module.scss';
import ProductsList from './ProductsList/ProductsList';
import ProductsFilters from './ProductsFilters/ProductsFilters';

const ProductsBlueprint = (props) => {
  return (
    <div className={classes.ProductsBlueprint}>
      <div className={classes.ProductsBlueprintFilters}>
        <ProductsFilters />
      </div>
      <div className={classes.ProductsBlueprintProducts}>
        <h3>
          <Link to="/" className={classes.Link}>
            Home
          </Link>{' '}
          / {props.title}
        </h3>
        <ProductsList title={props.title} productType={props.productType} />
      </div>
    </div>
  );
};

export default ProductsBlueprint;
