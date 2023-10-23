import React from 'react';

const Dash = () => {
  return (
    <div className='flex flex-col gap-8 p-8'>
      <h1 className='text-4xl'>Welcome</h1>

      {/* CARDSTUFF */}
      <div className='flex flex-row gap-12'>
        {/* CARD  */}
        <div className='flex flex-col gap-4 w-96 bg-gray-300 rounded-2xl p-8'>
          <p className='text-gray-500'>Available funds</p>
          <p className='text-5xl'>4500$</p>
          <div className='flex justify-between items-center'>
            <p>*****5563</p>
            <img src='mastercard.svg' className='w-12 h-12' alt='' />
          </div>
        </div>

        {/* CHART  */}
        <div className='w-1/2'>
          <h1 className='text-4xl'>charts</h1>
        </div>
      </div>
    </div>
  );
};

export default Dash;
