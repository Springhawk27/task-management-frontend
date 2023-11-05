import {
  ShopOutlined,
  DesktopOutlined,
  GithubOutlined,
  LinkedinFilled,
  GoogleSquareFilled,
  TwitterSquareFilled,
  TableOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, Grid, Drawer } from "antd";
const { Header, Content, Footer } = Layout;
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

const RootLayout = ({ children }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  return (
    <Layout>
      <Header
        className="bg-red-950"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="brand-logo">
          <h1>
            <Link
              href="/"
              style={{
                color: "white",
                padding: "5px 10px",
                borderRadius: "3px",
              }}
            >
              Tasker
            </Link>
          </h1>
        </div>
        {screens.md ? (
          <div className={styles.menu_items}>
            <Link href="/">
              <items>
                <Space>
                  <ShopOutlined />
                  All Tasks
                </Space>
              </items>
            </Link>

            {/* {session?.user ? ( */}
            <items>
              <Space>
                <Button
                  className="ms-2 font-bold"
                  onClick={() => signOut()}
                  type="text"
                  danger
                >
                  Logout
                </Button>
              </Space>
            </items>
            {/* ) : ( */}
            <Link href="/login">
              <Space>
                <items>Login</items>
              </Space>
            </Link>
            {/* )} */}
          </div>
        ) : (
          <>
            <div>
              <Button
                className="text-white font-bold text-xl"
                type="text"
                onClick={showDrawer}
              >
                Menu
              </Button>
            </div>

            <Drawer
              title="Menu"
              width={250}
              closable={false}
              onClose={onClose}
              open={open}
            >
              <div className="text-black flex flex-col gap-y-4">
                <Link href="/">
                  <items>
                    <Space>
                      <ShopOutlined />
                      All Tasks
                    </Space>
                  </items>
                </Link>

                {/* {session?.user ? ( */}
                <items>
                  <Space>
                    <Button
                      className="ms-2 font-bold"
                      onClick={() => signOut()}
                      type="text"
                      danger
                    >
                      Logout
                    </Button>
                  </Space>
                </items>
                {/* ) : ( */}
                <Link href="/login">
                  <Space>
                    <items>Login</items>
                  </Space>
                </Link>
                {/* )} */}
              </div>
            </Drawer>
          </>
        )}
      </Header>

      <Content
        style={{
          padding: "0 24px",
          minHeight: "100vh",
        }}
      >
        {children}
      </Content>

      <Footer
        className="bg-red-950 text-slate-300"
        style={{
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
          }}
        >
          Tasker
        </h2>
        <p className={styles.social_icons}>
          <Link href="https://github.com/Springhawk27" target="_blank">
            <GithubOutlined />
          </Link>
          <Link href="https://www.twitter.com/" target="_blank">
            <TwitterSquareFilled />
          </Link>
          <Link href="https://www.google.com/" target="_blank">
            <GoogleSquareFilled />
          </Link>
          <Link
            href="https://www.linkedin.com/in/sajjad-mahmud-khan/"
            target="_blank"
          >
            <LinkedinFilled />
          </Link>
        </p>
        <div className={styles.line}></div>
        Task Manager ©2023 Created by Sajjad Mahmud
      </Footer>
    </Layout>
  );
};
export default RootLayout;
