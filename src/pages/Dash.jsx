import { IconCash, IconCashOff, IconPigMoney } from '@tabler/icons-react';
import CardStat from '../components/CardStat';
import UpcomingBills from '../components/UpcomingBills';
import LatestExpenses from '../components/LatestExpenses';
import { useEffect, useState } from 'react';
import { getTotalIncome } from '../api/IncomeApi';
import { getTotalExpense } from '../api/ExpensesApi';

const Dash = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const getTotal = async () => {
      const income = await getTotalIncome();
      const expenses = await getTotalExpense();
      console.log(income);
      console.log(expenses);

      setTotalIncome(income.total_income);
      setTotalExpenses(expenses.total_expense);
    };

    getTotal();
  }, []);

  return (
    <div className=' flex flex-col gap-8 p-8'>
      <h1 className='text-4xl'>Welcome, Lotfi</h1>

      {/* top row */}
      <div className='flex flex-col md:flex-row gap-4 '>
        <CardStat
          title='Total Income'
          amount={totalIncome}
          change={3.95}
          icon={IconCash}
        />
        <CardStat
          title='Total Expenses'
          amount={totalExpenses}
          change={3.35}
          icon={IconCashOff}
        />
        <CardStat
          title='Total Savings'
          amount={totalIncome - totalExpenses}
          change={-5.55}
          icon={IconPigMoney}
        />
      </div>

      {/* bottom row */}
      <div className='flex gap-4'>
        <div className='w-1/2'>
          <UpcomingBills />
        </div>
        <div className='w-1/2'>
          <LatestExpenses />
        </div>
      </div>
    </div>
  );
};

export default Dash;
