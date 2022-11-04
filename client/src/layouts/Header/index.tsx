import {
  Dropdown,
  NavbarText,
  DropdownToggle,
  DropdownMenu,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { authApi } from '../../api';
import Logo from '../../assets/images/wms_logo.png';
import useAuth from '../../hooks/useAuth';
import '../style.css';

const logout = async (dispatch: any) => {
  try {
    await authApi.logOut();

    dispatch({
      type: 'LOGOUT'
    });

    redirect('/');
  } catch (error: unknown) {}
};

const Header = () => {
  const { handleSubmit } = useForm<any>();

  const { auth, dispatch } = useAuth();

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
                      <form
                        onSubmit={handleSubmit(() => {
                          logout(dispatch);
                        })}
                      >
                        <Button color="danger">Logout</Button>{' '}
                      </form>
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
