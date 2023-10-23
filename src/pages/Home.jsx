import { useState } from 'react';

import { IconBellRinging, IconReceipt2 } from '@tabler/icons-react';

import Expenses from './Expenses';
import Income from './Income';
import { Dashboard } from '../components/Dashboard';
import Dash from './Dash';
const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconBellRinging },
  { link: '/expense', label: 'Expenses', icon: IconBellRinging },
  { link: '/income', label: 'Income', icon: IconReceipt2 },
];

function Home() {
  const [active, setActive] = useState('Expenses');
  const renderComponent = () => {
    if (active === '/expense') {
      return <Expenses />;
    } else if (active === '/income') {
      return <Income />;
    } else {
      return <Dash />;
    }
  };
  return (
    <div className='flex  bg-gray-50 text-gray-800'>
      <div className='w-[20%]'>
        <Dashboard data={data} active={active} setActive={setActive} />
      </div>
      <div className='w-[80%]'>{renderComponent()}</div>
    </div>
  );
}

export default Home;
