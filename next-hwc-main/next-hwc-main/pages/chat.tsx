import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ChatContent from "../components/ChatContent";
import UserList from "../components/UserList";
import img from "../public/pictures/chat.png";
import { changeName } from "../store/user-slice";
import { routerBeforEach } from "../utils/router-beforEach";
import { NextPage } from "next";

const Chat: NextPage = () => {
    const router = useRouter();
    const [isloading, setIsloading] = useState(true);
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: '',
            content: '',
            receiver: ''
        }
            
    ]);

    // TODO：改变用户角色
    function changeMyName() {
        
    }

    // 进入页面后设置当前用户并判断是否有权限访问 
    useEffect(() => {
        routerBeforEach(router)
        dispatch(changeName(localStorage.getItem('username') as string))
    }, []);

    return (
        <Container>
            <img src={img.src} alt="" className="background" />
            <Button className="changeAvararButton" type="primary" onClick={changeMyName} >更换我的头像</Button>
            <ChatScreen>
                <UserList currentUser={currentUser} setCurrentUser={setCurrentUser} messages={messages} setMessages={setMessages} setIsloading={setIsloading}></UserList>
                <ChatContent currentUser={currentUser} setCurrentUser={setCurrentUser} messages={messages} setMessages={setMessages} isloading={isloading} setIsloading={setIsloading}></ChatContent>
            </ChatScreen>
        </Container>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
.background{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -999;
}
.changeAvararButton{
    position: absolute;
    top:3vw;
    right: 1vw;
    z-index: 999;
}
`
const ChatScreen = styled.div`
width: 75vw;
height: 80vh;
display: flex;
justify-content: space-between;
align-items: center;
`

export default Chat