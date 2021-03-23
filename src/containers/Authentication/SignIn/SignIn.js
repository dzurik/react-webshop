import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../../store/actions';
import SignBlueprint from '../SignBlueprint';

const SignIn = (props) => {
  const loading = useSelector((state) => {
    return state.auth.signInLoading;
  });

  const errorMessage = useSelector((state) => {
    return state.auth.signInErrorMessage;
  });

  const dispatch = useDispatch();

  const onAuth = (user, password, signUp) =>
    dispatch(actions.auth(user, password, signUp));

  return (
    <SignBlueprint
      errorMessage={errorMessage}
      loading={loading}
      title="Sign In"
      clicked={(user, password, signUp) => onAuth(user, password, false)}
    />
  );
};

export default SignIn;
