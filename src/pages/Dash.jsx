import { ActionIcon, Text, Title } from '@mantine/core';
import { IconSmoking } from '@tabler/icons-react';
import React from 'react';
import CardStat from '../components/CardStat';

const Dash = () => {
  return (
    <div className='flex flex-col gap-8 p-8'>
      <h1 className='text-4xl'>Welcome, Lotfi</h1>

      {/* top row */}
      <div className='flex flex-row gap-4'>
        <CardStat title='Total Income' amount={2500} change={3.5} />
        <CardStat title='Total Expenses' amount={2500} change={3.5} />
        <CardStat title='Total Savings' amount={2500} change={-3.5} />
      </div>
    </div>
  );
};

export default Dash;
