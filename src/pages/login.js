import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import { signIn } from "next-auth/react";
import RootLayout from "@/components/Layouts/RootLayout";
const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>Tasker Login</title>
      </Head>
      <div className="w-full h-screen  flex flex-col justify-center items-center ">
        <h3 className="mb-4]2">LOGIN To Tasker</h3>
        <div
          className="line"
          style={{
            height: "3px",
            margin: "10px 0",
            background: "#450A0B",
            width: "20%",
          }}
        ></div>
        <Button
          onClick={() =>
            signIn("github", {
              callbackUrl: "https://task-management-frontend-chi.vercel.app/",
            })
          }
        >
          <GithubOutlined /> Github
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
