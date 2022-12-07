import { Modal, BackDrop } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export class OpenModal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
  }

  //   componentDidUpdate(prevProps, prevState) {}
  render() {
    return createPortal(
      <BackDrop>
        <Modal></Modal>
      </BackDrop>,
      modalRoot
    );
  }
}
