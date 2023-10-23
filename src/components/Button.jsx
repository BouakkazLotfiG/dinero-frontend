const Button = ({ children }) => {
  return (
    <button className='bg-orange-500 px-4 py-3 text-white rounded-xl hover:bg-orange-400 transition ease-in-out duration-200'>
      {children}
    </button>
  );
};

export default Button;
