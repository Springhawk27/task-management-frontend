import RootLayout from "@/components/Layouts/RootLayout";
import AllTasks from "@/components/UI/AllTasks";
import Head from "next/head";
import React, { useState } from "react";
import { Button, Col, Image, List, Row, message } from "antd";
import Link from "next/link";

const AllTasksPage = ({ allTasks: initialTasks }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [deletedTask, setDeletedTask] = useState(null);
  const [allTasks, setAllTasks] = useState(initialTasks);

  // Function to remove a task from the client-side state
  const removeTaskFromState = (taskId) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  // AllTasksPage.js
  const handleRemoveTask = async (taskId) => {
    try {
      // const response = await fetch(`/api/v1/tasks/${taskId}`, {
      const response = await fetch(
        `http://localhost:5000/api/v1/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Task deleted successfully
        removeTaskFromState(taskId);
        successDelete();
      } else {
        // Handle error
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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
