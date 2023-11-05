import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Button type="primary">Button</Button>
      <h1>Welcome to Task management App</h1>
    </div>
  );
}
