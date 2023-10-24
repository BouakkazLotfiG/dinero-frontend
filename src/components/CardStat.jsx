import { ActionIcon, Title } from '@mantine/core';
import {
  IconCash,
  IconCashOff,
  IconChevronRight,
  IconPigMoney,
} from '@tabler/icons-react';
import React from 'react';

const CardStat = ({ title, amount, change }) => {
  return (
    <ActionIcon
      className='h-full bg-white border border-gray-300 w-full flex  flex-col items-start '
      radius='md'
      variant='filled'
    >
      <div className='border-b w-full'>
        <div className='p-4 flex items-center gap-2'>
          {title === 'Total Income' && <IconCash className='text-black' />}
          {title === 'Total Expenses' && <IconCashOff className='text-black' />}
          {title === 'Total Savings' && <IconPigMoney className='text-black' />}

          <p className='text-black'>{title}</p>

          <IconChevronRight className='text-gray-500 ml-auto' />
        </div>
      </div>

      <div className='p-4 flex flex-col gap-3'>
        <p className='text-black font-bold text-xl'>$ {amount}</p>
        <p
          className={`${
            change > 0 ? 'bg-green-600' : 'bg-red-500'
          } p-2 opacity-50 rounded-md mx-auto ml-0`}
        >
          {change} %
        </p>
      </div>
    </ActionIcon>
  );
};

export default CardStat;
