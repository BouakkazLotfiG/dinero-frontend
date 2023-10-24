import { IconCash, IconChevronRight } from '@tabler/icons-react';
import React from 'react';

const CardWithHeader = ({ title, icon, children }) => {
  return (
    <div className='   w-full   bg-white border border-gray-200 rounded-md flex  flex-col items-start '>
      <div className='border-b w-full'>
        <div className='p-4 flex items-center gap-2'>
          {/* render icon here */}
          {icon && React.createElement(icon, { className: 'text-gray-400' })}

          <p className='text-black'>{title}</p>

          <IconChevronRight className='text-gray-400 ml-auto' />
        </div>
      </div>
      <div className='p-4 flex flex-col gap-3 w-full overflow-x-auto'>
        {children}
      </div>
    </div>
  );
};

export default CardWithHeader;
