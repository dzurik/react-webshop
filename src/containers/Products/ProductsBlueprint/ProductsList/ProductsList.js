import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './ProductsList.module.scss';
import Product from '../Product/Product';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actions from '../../../../store/actions/index';

const ProductsList = (props) => {
  const listLoading = useSelector((state) => {
    return state.products.listLoading;
  });

  const list = useSelector((state) => {
    return state.products.list;
  });

  const dispatch = useDispatch();

  const onFetchProducts = useCallback(
    (product) => dispatch(actions.fetchProducts(product)),
    [dispatch]
  );

  useEffect(() => {
    onFetchProducts(props.productType);
  }, [onFetchProducts, props.productType]);

  let products = null;

  if (listLoading) {
    products = (
      <div className={classes.Spinner}>
        <Spinner />
      </div>
    );
  }

  if (list.length > 0) {
    products = (
      <div className={classes.ProductList}>
        {list.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              name={product.details.name}
              image={product.details.imageUrl}
              price={+product.details.price}
              sale={+product.details.sale}
              quantity={+product.details.quantity}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.PhonesProducts}>
      <div className={classes.Title}>
        <h1>{props.title}</h1>
        {!listLoading ? (
          <p className={classes.Found}>({list.length} product found )</p>
        ) : null}
      </div>

      <hr />

      {products}
    </div>
  );
};

export default ProductsList;
