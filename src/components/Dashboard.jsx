export function Dashboard({ data, active, setActive }) {
  const links = data.map((item) => (
    <a
      className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800  pr-6 ${
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
    <div className='flex flex-col  bg-white h-full border-r'>
      <div className='flex items-center justify-center h-14 border-b'>
        <div>Dinero</div>
      </div>

      <div className='flex  flex-col  pt-4  h-screen'>
        <div>
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
          <div>
            <a
              href='#'
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
            >
              p
              <span className='ml-2 text-sm tracking-wide truncate'>
                Profile
              </span>
            </a>
          </div>
          <div>
            <a
              href='#'
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
            >
              s
              <span className='ml-2 text-sm tracking-wide truncate'>
                Settings
              </span>
            </a>
          </div>
          <div>
            <a
              href='#'
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'
            >
              l
              <span className='ml-2 text-sm tracking-wide truncate'>
                Logout
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}