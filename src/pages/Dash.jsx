import { ActionIcon, Text, Title } from '@mantine/core';
import {
  IconCash,
  IconCashOff,
  IconPigMoney,
  IconSmoking,
} from '@tabler/icons-react';
import React from 'react';
import CardStat from '../components/CardStat';
import UpcomingBills from '../components/UpcomingBills';
import LatestExpenses from '../components/LatestExpenses';

const Dash = () => {
  return (
    <div className='flex flex-col gap-8 p-8'>
      <h1 className='text-4xl'>Welcome, Lotfi</h1>

      {/* top row */}
      <div className='flex flex-row gap-4'>
        <CardStat
          title='Total Income'
          amount={123500.0}
          change={3.95}
          icon={IconCash}
        />
        <CardStat
          title='Total Expenses'
          amount={2500}
          change={3.35}
          icon={IconCashOff}
        />
        <CardStat
          title='Total Savings'
          amount={2500}
          change={-5.55}
          icon={IconPigMoney}
        />
      </div>

      {/* bottom row */}
      <div className='flex gap-4'>
        <div className='w-1/2'>
          <UpcomingBills />
        </div>
        <div className='w-1/2'>
          <LatestExpenses />
        </div>
      </div>
    </div>
  );
};

export default Dash;
