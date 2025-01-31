// import styled from '@emotion/styled'
import styled from 'styled-components'
import React from 'react'
import { Avatar } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SearchIcon from '@mui/icons-material/Search'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
function Header() {

  const [user] = useAuthState(auth)

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar 
          onClick={() => signOut(auth)}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <input placeholder='Search Papafam' />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header


const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;
  
  > input {
    background-color: transparent;
    border: none;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
  `;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
  `;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
  `;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;