import { useDispatch } from 'react-redux';

import * as actions from '../../../store/actions';
import SignBlueprint from '../SignBlueprint';

const SignIn = (props) => {
  const dispatch = useDispatch();

  const onSignIn = (user, password) => dispatch(actions.signIn(user, password));

  return (
    <SignBlueprint
      title="Sign In"
      clicked={(user, password) => onSignIn(user, password)}
    />
  );
};

export default SignIn;
