import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useForm } from "react-hook-form";

const AddTaskModal = ({ open, onAddTask, onCancel }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    onAddTask(data);
    reset();
    onCancel();
  };

  return (
    <Modal title="Add New Task" open={open} onCancel={onCancel} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full border rounded-md py-2 px-3"
            {...register("title", { required: true })}
            placeholder="Enter title"
            id="title"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full border rounded-md py-2 px-3"
            {...register("description", { required: true })}
            placeholder="Enter description"
            id="description"
          />
        </div>
        <div className="text-center">
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
