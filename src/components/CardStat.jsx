import CardWithHeader from './CardWithHeader';

const CardStat = ({ title, amount, change, icon }) => {
  return (
    <CardWithHeader title={title} icon={icon}>
      <div className=' flex flex-col gap-3'>
        <p className='text-black font-bold text-xl'>$ {amount}</p>
        <p
          className={`${
            change > 0 ? 'bg-green-600' : 'bg-red-500'
          } text-white px-2 py-1 opacity-50 rounded-md mx-auto ml-0 font-thin text-xs `}
        >
          {change} %
        </p>
      </div>
    </CardWithHeader>
  );
};

export default CardStat;
