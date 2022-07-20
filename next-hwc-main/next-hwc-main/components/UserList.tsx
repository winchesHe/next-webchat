import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { Avatar } from 'antd';
import { useAppSelector } from '../store/hook';

const http = 'http://localhost:3000';

export default function UserList({
    currentUser = 'winches',
    setCurrentUser = new Function(),
    messages = [{
        sender: '',
        content: '',
        receiver: ''
    }],
    setMessages = new Function(),
    setIsloading = new Function()
}) {
    
    const { username } = useAppSelector((state: any) => ({ ...state.state }));
    const [Users, setUsers] = useState([{
        username: '',
        avatar: '',
    }]);
    const socket = io(http);
    const value = username?.value;

    // 设置当前的用户
    async function setCurrentChater(user: any) {
        setCurrentUser(user)
    }

    // 获取当前用户信息
    function getCurentMessages() {
        axios.post(`${http}/message/list`, {
            "username": value,
            "currentChater": currentUser
        }).then(res => {
            setMessages(res?.data?.data?.messageList)
        })
    }

    // 删除当前用户信息
    function deletCurrentMessages() {
        setMessages([]);
    }

    // 获取用户列表
    function getUserList() {
        axios.get(`${http}/users`).then(res => {
            setUsers(res?.data);
        })
    }

    // 监听当前用户变化
    useEffect(() => {
        setIsloading(true);
        deletCurrentMessages();
        if (currentUser !== '') {
            getCurentMessages();
        }
    }, [currentUser]);

    // 监听信息变化有信息后就取消加载
    useEffect(() => {
        setTimeout(() => {
            setIsloading(false)
        }, 100);
    }, [messages]);

    // 刚进页面获取用户列表
    useEffect(() => {
        getUserList();
    }, []);

    // 当发送信息后后台返回showMessage事件，收到后获取实时获取新信息
    useEffect(() => {
        socket.on('showMessage', getCurentMessages);
        return () => {
            socket.off('showMessage');
        }
    });

    return (
        <Container>
            {
                Users?.map((user, index) => {
                    if (user.username == value) {
                        return;
                    }
                    return (
                        <div
                            className="userCard"
                            onClick={() => setCurrentChater(user.username)}
                            key={index}
                        >
                            <Avatar className='avatar' src={'https://avatars.githubusercontent.com/u/96854855?v=4'}></Avatar>
                            <p className='username' >{user.username}</p>
                        </div>
                    )
                })
            }
            {
                Users?.map((user) => {
                    if (user.username == value) {
                        return (
                            <Avatar className='myAvatar' src={user.avatar}></Avatar>
                        )
                    }
                })
            }
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
width:35%;
height: 100%;
background-color: #946127c5;
overflow-y: scroll;
::-webkit-scrollbar
{
    
 width: 4px;
 background-color:grey;
}
   .myAvatar{
        position:fixed;
        right: 10px;
        top: 5vw;
        z-index: 100;
        width: 7vw;
        height: 7vw;
    }
.userCard{
    width: 90%;
    height: 20%;
    border: 1px solid #5a4d4daa;
    justify-content: space-around;
    align-items: center;
    display: flex;
    .avatar{
        width: 7vw;
        height: 7vw;
    }
    .username{
        font-size: 20px;
        color: #e67f09;
    }
    transition: all 0.5s;
    :hover{
        background-color: #e67f09;
        cursor: pointer;
        .username{
            font-weight : bold;
            color: #1d0b04dd;
        }
    }
 
}
`
