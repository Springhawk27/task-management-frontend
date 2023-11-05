import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useForm } from "react-hook-form";

const AddTaskModal = ({ open, onAddTask, onCancel }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    onAddTask(data);
    reset();
    onCancel();
  };

  return (
    <Modal title="Add New Task" open={open} onCancel={onCancel} footer={null}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input
            {...register("title", { required: true })}
            placeholder="Enter title"
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea
            {...register("description", { required: true })}
            placeholder="Enter description"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
