/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { UrgentContext } from '../../contexts/UrgentContext';
import { IStockAlert } from '../../interfaces/AnalyticsInterface';
import '../style.css';

function Example({ ...args }) {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<any>(null);
  const [notification, setNotification] = useState<string>('Alert Ali');
  const [len, setLen] = useState<number>(0);
  const { setUrgent } = useContext(UrgentContext);

  useEffect(() => {
    setSocket(io('http://localhost:8080'));
  }, []);

  const runSocket = async () => {
    socket?.on('sendAlert', (data: { msg: string; arr: IStockAlert[] }) => {
      setLen(data.arr.length);
      setNotification(data.msg);
      setUrgent(data.arr);
    });
  };

  useEffect(() => {
    runSocket();
  }, [socket, notification]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="d-flex p-5 circle2">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="rounded">
        <DropdownToggle
          caret={false}
          className="dp-toggle bg-white border-0 rounded"
        >
          <span className="username d-flex justify-content-center align-items-center text-white bg-primary rounded-circle">
            {len}
          </span>
        </DropdownToggle>
        <DropdownMenu {...args}>
          <div className="alert">
            <DropdownItem text>{notification}</DropdownItem>
            <Button
              color="danger"
              className="text-white"
              onClick={() => {
                navigate(`/transactions/add`);
              }}
            >
              Order All
            </Button>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

Example.propTypes = {
  direction: PropTypes.string
};

export default Example;