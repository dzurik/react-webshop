import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../../store/actions';

import SignBlueprint from '../SignBlueprint';

const SignUp = (props) => {
  const loading = useSelector((state) => {
    return state.auth.signUpLoading;
  });

  const errorMessage = useSelector((state) => {
    return state.auth.signUpErrorMessage;
  });

  const dispatch = useDispatch();

  const onAuth = (user, password, signUp) =>
    dispatch(actions.auth(user, password, signUp));

  return (
    <SignBlueprint
      errorMessage={errorMessage}
      loading={loading}
      title="Sign Up"
      clicked={(user, password, signUp) => onAuth(user, password, true)}
    />
  );
};

export default SignUp;
