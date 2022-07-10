import type { NextPage } from 'next';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';
import { Button } from 'antd';
import { Count } from './count/count';
import axios from 'axios';
import { io } from 'socket.io-client';

const Home: NextPage = () => {
  // 验证axios
  async function send() {
    const res = await axios.get('http://localhost:3000');
    console.log(res);
  }
  // send()

  // socket-io
  const socket = io('http://localhost:3000');
  socket.on('connect', function() {
    console.log('Connected');

    // 创建新用户
    // socket.emit('createMq', {username: 'winches', password: '123456'}, res => {
    //   console.log(res);
    // })

    // 查找全部用户
    socket.emit('findAllMq', (res: any) => {
      console.log(res);
    })

    // 根据id查找用户
    socket.emit('findOneMq', 1, (res: any) => {
      console.log(res);
    })
  })

  return (
    <div className={styles.container}>
      <Wrapper>
        <Title>Hello World, this is my first styled component!</Title>
      </Wrapper>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Count></Count>
    </div>
  )
}

export default Home

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;