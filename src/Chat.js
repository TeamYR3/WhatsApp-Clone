import { Avatar } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutLined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./Chat.css";
function Chat() {
    return (
        <div className = "Chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutLined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>
            </div>
        
            
        </div>
    )
}

export default Chat
