import React from 'react';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import './styles.css';

export default function ModalConfirm(props) {
  return (
    <Modal
      visible={true}
      width='50%'
      height='30%'
      effect='fadeInUp'
      onClickAway={props.onCancel}
    >
      <h1>¿Está seguro de borrar el anuncio?</h1>
      <Button onClick={props.onConfirm}>Si</Button>
      <Button onClick={props.onCancel}>No</Button>
    </Modal>
  );
}
