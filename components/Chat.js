import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";

function Chat({ id, user }) {
  
  return (
    <Container>
      <UserAvatar src={user.photoURL}></UserAvatar>
      <p>{user?.displayName}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  word-break: break-word;
  :hover {
      background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
  :hover {
    opacity: 0.8;
  }
`;
