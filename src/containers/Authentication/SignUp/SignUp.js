import { useDispatch } from 'react-redux';

import * as actions from '../../../store/actions';

import SignBlueprint from '../SignBlueprint';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const onSignUp = (user, password) => dispatch(actions.signUp(user, password));

  return (
    <SignBlueprint
      title="Sign Up"
      clicked={(user, password) => onSignUp(user, password)}
    />
  );
};

export default SignUp;
