import { Avatar, IconButton, Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useStatate, useEffect } from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import {
  serverTimestamp,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import Chat from "../components/Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "!=", user.email));
  const [snapshot, loading, error] = useCollection(q);

  const logOut = async () => {
    auth.signOut();
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      photoURL: user.photoURL,
      lastSeen: serverTimestamp(),
      isOnline: false,
    displayName: user.displayName,
    });
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={logOut} src={user.photoURL} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput />
      </Search>

      {snapshot && snapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} user={chat.data()}></Chat>
      ))
      }
    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
