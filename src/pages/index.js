import RootLayout from "@/components/Layouts/RootLayout";
import AllTasks from "@/components/UI/AllTasks";
import Banner from "@/components/UI/Banner";

import Head from "next/head";
import React from "react";

const HomePage = ({ allTasks }) => {
  console.log("tasks", allTasks);
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="This is a Task Management Web Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner></Banner>
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
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
