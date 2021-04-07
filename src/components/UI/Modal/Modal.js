import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import classes from './Modal.module.scss';

const Modal = (props, ref) => {
  const nodeRefModal = useRef(null);
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
        mountOnEnter
        unmountOnExit
      >
        <div
          className={classes.Backdrop}
          ref={nodeRefBackdrop}
          onClick={props.modalClose}
        />
      </CSSTransition>

      <CSSTransition
        in={props.show}
        timeout={500}
        nodeRef={nodeRefModal}
        classNames={{
          enterActive: classes.ModalOpen,
          exitActive: classes.ModalClosed,
        }}
        unmountOnExit
      >
        <div className={classes.Modal} ref={nodeRefModal}>
          {props.children}
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
