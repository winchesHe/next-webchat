import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Form, Input, Button, notification } from 'antd';
import { Count } from './count/count';
import pciture from '../public/pictures/background.png'
import style from 'styled-components'
import axios from 'axios';
import { io } from 'socket.io-client';
import router from 'next/router';

const http = 'http://localhost:3000';

type FormData = {
  username: string,
  password: string,
  confirmedPassword?: string
};

const Home: NextPage = () => {
  const socket = io('http://localhost:3000');

  // 发送注册
  async function login(formData: FormData) {
    formData = { username: formData.username, password: formData.password }
    axios.post(`${http}/auth/login`, formData)
    .then(async (res) => {
      if (res?.data === undefined) {
        notification.error({
          message: '登录失败',
          description: '请检查网络设置',
          duration: 2
        })
        return;
      }
      
      if (res?.data?.data?.token !== undefined) {
        notification['success']({
          message: '成功提示',
          description: '您已经成功登录',
          duration: 2
        })
        socket.emit("connection", async (socket: { join: (arg0: string) => any; id: any; }) => {
          console.log(socket);
          await socket.join(formData.username);
        });
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('username', formData.username)
        router.push('/chat')
      } else {
        notification['error']({
          message: '失败提示',
          description: `${res?.data.msg}`,
          duration: 2
        })
      }
    })
  }

  // 密码校验
  function passwordIsValid(formData: FormData) {
    return formData.password === formData.confirmedPassword;
  }

  // 注册
  async function register(values: FormData) {
    return axios.post(`${http}/auth/register`, {
        username: values.username,
        password: values.password,
        avataro: `https://api.multiavatar.com/Binx%${Math.floor((Math.random() * 50000))}.png`
     })
   }

  // 提交登录
  const onFinish = async (formData: FormData) => {
    if (passwordIsValid(formData)) {
      let registerRes = await register(formData)
      if (registerRes.data.code == 0 || registerRes.data.code == 200) {
        login(formData)
      }
    } else {
      notification['error']({
        message: '请注意！',
        description: '两次输入密码不一致',
        duration: 2
      })
    };
  }

  // socket-io
  // socket.on('connect', function() {
  //   console.log('Connected');

  //   // 创建新用户
  //   // socket.emit('createMq', {username: 'winches', password: '123456'}, res => {
  //   //   console.log(res);
  //   // })

  //   // 查找全部用户
  //   socket.emit('findAllMq', (res: any) => {
  //     console.log(res);
  //   })

  //   // 根据id查找用户
  //   socket.emit('findOneMq', 1, (res: any) => {
  //     console.log(res);
  //   })
  // })

  return (
    <Container>
        <img className='background' src={pciture.src} alt="" />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={ onFinish }
          autoComplete="on"
          className='form'
        >
          <Form.Item
            label="输入用户名："
            name="username"
            className='form-item'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input defaultValue={'winches'} />
          </Form.Item>

          <Form.Item
            label="请输入密码："
            name="password"
            className='form-item'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password defaultValue={'123456'}/>
          </Form.Item>

          <Form.Item
            label="请确认密码："
            name="confirmedPassword"
            className='form-item'
            rules={[{ required: true, message: '请确认密码' }]}
          >
            <Input.Password defaultValue={'123456'}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className='submit-btn'>
              登录
            </Button>

          </Form.Item>
          <p>
            新用户未注册会自动注册并登录
          </p>
        </Form>

      </Container>
  )
}

export default Home

const Container = style.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  .form{
    background: #fff;
    width: 30vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 30px #109fb27b;
    opacity: 0.5;
    label{
          color: #0e77eede;
          margin-right: 10px;
          font-size: 16px;
    }
  }
  .form-item{
    width: 400px;
    padding: 10px;
    margin-top: 10px;
    }
    .background{
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1;
  }
  .submit-btn{
    :hover{
      background: #3f0eeede;
      color: #ffffff;
      border-color: #3f0eeede;
    }
  }
`