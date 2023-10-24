import { Avatar } from '@mantine/core';
import { IconUser, IconWallet } from '@tabler/icons-react';

export function Dashboard({ data, active, setActive }) {
  const links = data.map((item) => (
    <a
      className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 rounded-xl pr-6 ${
        item.link === active ? 'bg-indigo-100 text-indigo-700' : ''
      }`}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.link);
      }}
    >
      <span className='inline-flex justify-center items-center ml-4'>
        <item.icon className='mr-2' />
      </span>
      <span className='ml-2 text-sm tracking-wide truncate'>{item.label}</span>
    </a>
  ));

  return (
    <div className=' h-screen flex flex-col px-12  bg-white  border-r'>
      <div className='flex flex-col justify-center items-center mt-20'>
        <Avatar size='xl' src={null} alt='no image here' />
        <p className='text-gray-400 mt-3'>Welcome,</p>
        <p className='font-semibold'>Lotfi Bouakkaz</p>
      </div>

      <div className='flex flex-col mt-6 pt-4 '>
        <div className='px-5'>
          <div className='flex flex-row items-center h-8'>
            <div className='text-sm font-light tracking-wide text-gray-500'>
              Menu
            </div>
          </div>
        </div>
        {links}
      </div>
      <div className='mt-auto border-t py-4 '>
        <div className='px-5 '>
          <div className='flex flex-row items-center h-8'>
            <div className='text-sm font-light tracking-wide text-gray-500'>
              Settings
            </div>
          </div>
        </div>
        <a
          className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800  pr-6 `}
        >
          <span className='inline-flex justify-center items-center ml-4'>
            <IconUser className='mr-2' />
          </span>
          <span className='ml-2 text-sm tracking-wide truncate'>Profile</span>
        </a>
      </div>
    </div>
  );
}
