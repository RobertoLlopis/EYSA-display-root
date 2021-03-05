import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./Login.module.scss";
const Login = () => {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const onFinish = ({ username }) => {
    setUser(username);
    localStorage.setItem("user", username);
    router.back();
  };

  return (
    <div className={styles.container}>
      <h1>Ey, wait a little and login</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
