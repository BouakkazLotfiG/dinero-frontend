import { Avatar } from '@mantine/core';
import { IconUser, IconWallet } from '@tabler/icons-react';

export function Dashboard({ data, active, setActive }) {
  const links = data.map((item) => (
    <a
      className={`relative flex flex-row justify-center md:justify-start items-center h-11 focus:outline-none hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 transition ease-in-out duration-200  rounded-md md:pr-6 ${
        item.link === active ? 'bg-indigo-100 text-indigo-700' : ''
      }`}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.link);
      }}
    >
      <span className='inline-flex justify-center items-center md:ml-4'>
        <item.icon className='md:mr-2' />
      </span>
      <span className='hidden md:block  ml-2 text-sm tracking-wide truncate'>
        {item.label}
      </span>
    </a>
  ));

  return (
    <div className='fixed w-20 md:w-72 h-screen flex flex-col px-2 md:px-4 lg:px-12  bg-white  border-r'>
      <div className='hidden md:flex flex-col justify-center items-center mt-20'>
        <Avatar size='xl' src={null} alt='no image here' />
        <p className='text-gray-400 mt-3'>Welcome,</p>
        <p className='font-semibold'>Lotfi Bouakkaz</p>
      </div>

      <div className='flex flex-col mt-6 pt-4 '>
        <div className='mx-auto md:px-5'>
          <div className='flex flex-row items-center h-8'>
            <div className='text-sm font-light tracking-wide text-gray-500'>
              Menu
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>{links}</div>
      </div>
    </div>
  );
}
