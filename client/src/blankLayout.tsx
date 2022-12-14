import { Link, Outlet } from 'react-router-dom';

const BlankLayout = () => (
  <div className="d-flex">
    <div className="container-fluid px-0">
      <main
        className="login-container d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: '#d8e4ef',
          height: '100%'
        }}
      >
        <Outlet />
        <div className="about-link shadow">
          <Link to="/about">?</Link>
        </div>
      </main>
    </div>
  </div>
);

export default BlankLayout;
