import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import classes from './ModalSecondary.module.scss';

const ModalSecondary = React.memo((props) => {
  let modalSecondaryClasses = [classes.ModalSecondary];
  let backdropClasses = [classes.Backdrop];

  if (props.newStyle === 'list') {
    backdropClasses.push(classes.ListBackdrop);
    modalSecondaryClasses.push(classes.List);
  }

  const nodeRefModalSecondary = useRef(null);
  const nodeRefBackdrop = useRef(null);

  return (
    <React.Fragment>
      <CSSTransition
        in={props.show}
        timeout={500}
        nodeRef={nodeRefBackdrop}
        classNames={{
          enterActive: classes.BackdropOpen,
          exitActive: classes.BackdropClosed,
        }}
        unmountOnExit
      >
        <div
          className={backdropClasses.join(' ')}
          ref={nodeRefBackdrop}
          onClick={props.modalClose}
        />
      </CSSTransition>

      <CSSTransition
        in={props.show}
        timeout={500}
        nodeRef={nodeRefModalSecondary}
        classNames={{
          enterActive: classes.ModalSecondaryOpen,
          exitActive: classes.ModalSecondaryClosed,
        }}
        unmountOnExit
      >
        <div className={modalSecondaryClasses.join(' ')} ref={nodeRefModalSecondary}>
          {props.children}
        </div>
      </CSSTransition>
    </React.Fragment>
  );
});

export default ModalSecondary;
