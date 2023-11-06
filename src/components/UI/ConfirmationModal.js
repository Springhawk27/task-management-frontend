import React from "react";
import { Modal, Button } from "antd";

const ConfirmationModal = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirm Action"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p>Are you sure you want to remove this task?</p>
    </Modal>
  );
};

export default ConfirmationModal;
