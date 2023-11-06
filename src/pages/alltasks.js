import RootLayout from "@/components/Layouts/RootLayout";
import AllTasks from "@/components/UI/AllTasks";
import Head from "next/head";
import React, { useState } from "react";
import { Button, Col, Image, List, Row, message } from "antd";
import Link from "next/link";
import AddTaskModal from "@/components/UI/AddTaskModal";
import ConfirmationModal from "@/components/UI/ConfirmationModal";

const AllTasksPage = ({ allTasks: initialTasks }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [deletedTask, setDeletedTask] = useState(null);
  const [allTasks, setAllTasks] = useState(initialTasks);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/tasks/create-task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );

      if (response.ok) {
        success();
        fetchTasks();
        setIsAddTaskModalVisible(false);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Function to remove a task from the client-side
  const removeTaskFromState = (taskId) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  // Function to remove a task
  const handleRemoveTask = (taskId) => {
    setTaskToRemove(taskId);
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmRemoveTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/tasks/${taskToRemove}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Task deleted successfully
        removeTaskFromState(taskToRemove);
        successDelete();
        setIsConfirmationModalVisible(false);
      } else {
        // Handle error
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // modal cancel remove
  const handleCancelRemoveTask = () => {
    setIsConfirmationModalVisible(false);
  };

  // fetch the latest/refresh tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/tasks");
      const data = await res.json();
      setAllTasks(data?.data);
      successRefresh();
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  // refresh handler
  const handleRefresh = () => {
    fetchTasks();
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: `Great, You have added a task`,
    });
  };
  const successDelete = () => {
    messageApi.open({
      type: "success",
      content: `Alas, You have removed a task`,
    });
  };
  const successRefresh = () => {
    messageApi.open({
      type: "success",
      content: `Great, You have the latest task`,
    });
  };

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="This is a task management Web Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AllTasks allTasks={allTasks}></AllTasks>

      <div>
        {contextHolder}
        <AddTaskModal
          open={isAddTaskModalVisible}
          onAddTask={handleAddTask}
          onCancel={() => setIsAddTaskModalVisible(false)}
        />
        <ConfirmationModal
          open={isConfirmationModalVisible}
          onConfirm={handleConfirmRemoveTask}
          onCancel={handleCancelRemoveTask}
        />

        <Row>
          <Col className="w-full mb-10 flex justify-center">
            <List
              className="md:w-3/5 w-full  "
              header={
                <div
                  className="font-semibold flex justify-between items-center"
                  // style={{ border: "2px solid red" }}
                >
                  <Button
                    className="font-bold text-red-800 hover:text-sky-700"
                    type="link"
                    onClick={() => {
                      console.log("Add New Task button clicked");
                      setIsAddTaskModalVisible(true);
                    }}
                  >
                    Add New Task
                  </Button>{" "}
                  <Button type="link" onClick={handleRefresh}>
                    Refresh
                  </Button>
                </div>
              }
              itemLayout="horizontal"
            >
              {allTasks.map((task) => (
                <List.Item
                  key={task.id}
                  className="bg-slate-50 mb-2 p-2"
                  actions={[
                    <Link href="/" key="list-loadmore-edit">
                      <Button
                        type="text"
                        key="list-loadmore-edit"
                        className={"text-yellow-500"}
                      >
                        Edit
                      </Button>
                    </Link>,
                    <Button
                      type="text"
                      key="list-loadmore-edit"
                      className="text-red-500"
                      onClick={() => handleRemoveTask(task._id)}
                      disabled={task.id === deletedTask}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={<span>{task.title} </span>}
                    description={
                      <div className="flex md:flex-row flex-col w-full gap-2">
                        <div className="flex flex-col ">
                          <p className={"text-blue-600 w-full"}>
                            {task?.description}
                          </p>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              ))}
            </List>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AllTasksPage;

AllTasksPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  // if (typeof window === "undefined") {
  //   return {
  //     props: {
  //       allTasks: [],
  //     },
  //   };
  // }
  const res = await fetch(`${process.env.URL}/api/v1/tasks`);
  const data = await res.json();
  console.log(data);
  // Get all tasks
  const allTasks = data?.data;

  return {
    props: {
      allTasks,
    },
  };
};
