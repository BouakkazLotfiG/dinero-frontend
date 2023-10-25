import { Button } from '@mantine/core';
import CardWithHeader from './CardWithHeader';

const UpcomingBills = () => {
  return (
    <CardWithHeader title='Upcoming Bills'>
      <div className='flex gap-2 '>
        <Button variant='outline' className='h-auto border-indigo-300'>
          Add Bill
        </Button>
        <div className='overflow-x-auto'>
          {' '}
          {/* Adjust max-h as needed */}
          {/* Make sure to add 'h-full' to ensure the container takes up the full height */}
          <div className='flex gap-2 w-full'>
            <CardWithHeader title='Amazon'>
              <p className='text-black font-bold'>$ 100</p>
              <p className='text-gray-400 text-sm'>17 july 2023</p>
            </CardWithHeader>
            <CardWithHeader title='Netflix'>
              <p className='text-black font-bold'>$ 100</p>
              <p className='text-gray-400 text-sm'>Rent</p>
            </CardWithHeader>
            <CardWithHeader title='Dropbox'>
              <p className='text-black font-bold'>$ 100</p>
              <p className='text-gray-400 text-sm'>Rent</p>
            </CardWithHeader>
            <CardWithHeader title='Dropbox'>
              <p className='text-black font-bold'>$ 100</p>
              <p className='text-gray-400 text-sm'>Rent</p>
            </CardWithHeader>
            <CardWithHeader title='Dropbox'>
              <p className='text-black font-bold'>$ 100</p>
              <p className='text-gray-400 text-sm'>Rent</p>
            </CardWithHeader>
          </div>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default UpcomingBills;
