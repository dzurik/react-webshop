import React from 'react';
import classes from './FourOFourError.module.scss';
import sadEmoji from '../../assets/images/sad_emoji.png';
import ButtonSecondary from '../UI/ButtonSecondary/ButtonSecondary';

const FourOFourError = React.memo((props) => {
  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className={classes.FourOFourError}>
      <img src={sadEmoji} alt="404 Error" />
      <h2>Page Not Found!</h2>

      <ButtonSecondary clicked={() => goBack()}>Back to last page</ButtonSecondary>
    </div>
  );
});

export default FourOFourError;
