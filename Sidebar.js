import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';

import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [allRooms, setAllRooms] = useState([]);
    const [searchString, setSearchString] = useState('');   
    const [{ user }, dispatch] = useStateValue();

    function handleChange(e) {
        setSearchString(e.target.value);
        const filteredRooms = allRooms.filter((r) => {
            return r.data.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ? true : false
        });
        setRooms(filteredRooms);
    }

    useEffect(() => {

        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
            const getRooms = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setRooms(getRooms);
            setAllRooms(getRooms);
        });
        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__hederRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input value={searchString} onChange={handleChange} placeholder="Search or start new chat" type="text" />
                </div>

            </div>
            <div className="sidebar__chat">
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id}
                        name={room.data.name} />

                ))}
            </div>

        </div>
    );
}

export default Sidebar;