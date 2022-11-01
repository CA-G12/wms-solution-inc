import '../style.css';
import {
  NavbarText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/images/wms_logo.png';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { auth } = useAuth();

  const { user } = auth;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <header>
      <div className="header-content bg-white py-0 container-fluid">
        <nav
          className={`navbar navbar-expand-lg d-flex flex-row${
            auth?.loggedIn ? '-reverse' : ''
          } justify-content-between p-1`}
        >
          {auth?.loggedIn ? (
            ''
          ) : (
            <Breadcrumb listClassName="mb-0 p-2">
              <BreadcrumbItem className="text-decoration-none">
                <NavLink
                  to="login"
                  style={({ isActive }) =>
                    isActive ? undefined : { color: 'rgb(126, 123, 121)' }
                  }
                >
                  LogIn
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="text-decoration-none">
                <NavLink
                  to="about"
                  style={({ isActive }) =>
                    isActive ? undefined : { color: 'rgb(126, 123, 121)' }
                  }
                >
                  About Us
                </NavLink>
              </BreadcrumbItem>
            </Breadcrumb>
          )}
          {auth?.loggedIn ? (
            <NavbarText className="nav-text d-flex">
              <div className="d-flex rounded">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className="rounded"
                >
                  <DropdownToggle
                    caret={false}
                    className="dp-toggle bg-white border-0 rounded"
                  >
                    <span className="username d-flex justify-content-center align-items-center text-white bg-primary rounded-circle">
                      AU
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <div className="rounded px-3 py-2">
                      <div className="d-flex gap-3 align-items-center">
                        <div>
                          <span className="p-4 bg-border rounded-circle text-black">
                            AU
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-1">{user?.email}</p>
                          <p className="mb-2">{user?.username}</p>
                        </div>
                      </div>
                      <hr />
                      <Button color="danger">
                        <NavLink
                          to="/login"
                          className="text-white d-block text-decoration-none"
                        >
                          Logout
                        </NavLink>
                      </Button>{' '}
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </NavbarText>
          ) : (
            <img
              src={Logo}
              alt=""
              className="navbar-brand"
              style={{ width: '2.5rem', display: 'block' }}
            />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
