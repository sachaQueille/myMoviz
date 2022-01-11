import React from 'react';
import { NavItem, NavLink, Nav, Button} from 'reactstrap';


function NavBar(props) {
  let colorItems = {
    color: 'white',
  }

  let popoverClick = () => {
    props.popoverClickParent();
  }

  return (
    <>
      <Nav>
        <NavItem>
          <img src="./logo.png" alt="logo" width="30" height="30" className="d-inline-block align-top" />
        </NavItem>
        <NavItem >
          <NavLink style={colorItems}>Last Releases</NavLink>
        </NavItem>
        <NavItem>
          <NavLink ><Button onClick={() => popoverClick()} id="listMoviePop" type="button">{props.moviesCount} films</Button></NavLink>

        </NavItem>
      </Nav>

    </>
  )
}

export default NavBar;