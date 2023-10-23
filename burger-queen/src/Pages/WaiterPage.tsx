import React from 'react';
import { Profile } from '../components/common';
import { Waiter } from '../components/waiter';
import { useLocation } from 'react-router-dom';

function WaiterView() {
  const location = useLocation();
  const token = location.state?.token;

  return (
    <div>
      <Profile token={token} />
      <Waiter token={token} role="waiter" />
    </div>
  );
}

export default WaiterView;
