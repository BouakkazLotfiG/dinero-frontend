import { IconCash, IconChevronRight } from '@tabler/icons-react';

const CardWithHeader = ({ title, icon, children }) => {
  return (
    <div className='  bg-white border border-gray-200 rounded-md flex  flex-col items-start '>
      <div className='border-b w-full'>
        <div className='p-4 flex items-center gap-2'>
          <IconCash className='text-black' />

          <p className='text-black'>{title}</p>

          <IconChevronRight className='text-gray-400 ml-auto' />
        </div>
      </div>
      <div className='p-4 flex flex-col gap-3'>{children}</div>
    </div>
  );
};

export default CardWithHeader;
