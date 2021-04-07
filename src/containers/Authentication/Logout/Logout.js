import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';

const Logout = (props) => {
  const dispatch = useDispatch();

  const { history } = props;

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const onLogout = useCallback(() => dispatch(actions.authLogout()), [dispatch]);

  const onClearCart = useCallback(() => dispatch(actions.clearCart()), [dispatch]);

  useEffect(() => {
    if (token) {
      onClearCart();
      onLogout();
    } else {
      onLogout();
    }
    history.goBack();
  }, [onLogout, onClearCart, history, token]);
  return <div></div>;
  // return <Redirect to={props.history.location.pathname} />;
};

export default Logout;
