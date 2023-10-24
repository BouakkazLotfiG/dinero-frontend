const Mastercard = () => {
  return (
    <div className='flex flex-col gap-4 w-96 bg-gray-200 rounded-2xl p-8'>
      <p className='text-gray-500'>Available funds</p>
      <p className='text-5xl'>4500$</p>
      <div className='flex justify-between items-center'>
        <p>*****5563</p>
        <img src='mastercard.svg' className='w-12 h-12' alt='' />
      </div>
    </div>
  );
};

export default Mastercard;
