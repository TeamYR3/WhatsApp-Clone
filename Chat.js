import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar } from "@material-ui/core";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons';
import { IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [allMessages, setAllMessages] = useState([]);
    const [searchString, setSearchString] = useState('');  

    function handleChange(e) {
        setSearchString(e.target.value);
        const filteredMessages = allMessages.filter((r) => {
            return !!r.message && r.message.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ? true : false
        });
        setMessages(filteredMessages);
    }

    useEffect(() => {
        setSearchString('');
        if (roomId) {
            db.collection('rooms').
                doc(roomId)
                .onSnapshot((snapshot) => setRoomName
                    (snapshot.data().name));

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    const getMessages = snapshot.docs.map((doc) =>
                    doc.data());
                    setMessages(getMessages);
                        setAllMessages(getMessages);
                 } );

        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed >>>> ", input);
        db.collection('rooms').doc(roomId).collection
            ('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.
                    serverTimestamp(),
            });

        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                    {new Date(
                       allMessages[allMessages.length -1]?.
                       timestamp?.toDate()
                       ).toUTCString()}
                    </p>
                </div>



                <div className="chat__searchContainer">
                <SearchOutlined />
                    <input value={searchString} onChange={handleChange} placeholder="Search chat.." type="text" />
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
           
                

           
            <div className="chat__body">
                {messages.map(message => (
                    <p
                        className={`chat__message ${message.name === user.displayName
                            && "chat__reciever"
                            }`}
                    >
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate
                                ()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.
                        value)}
                        placeholder="Type a message"
                        type="text" />
                    <button onClick={sendMessage}
                        type="submit">Send a message
                   </button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
