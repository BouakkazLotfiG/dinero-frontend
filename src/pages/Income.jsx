import React, { useEffect, useState } from 'react';

import { IconTrash } from '@tabler/icons-react';
import { getIncomes } from '../api/IncomeApi';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchIncome = async () => {
    try {
      const response = await getIncomes();
      console.log('Expenses:', response);
      setIncome(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Income:', error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [refresh]);

  let content;

  if (loading) {
    content = <p>Loading Income...</p>;
  } else {
    content = (
      <table className='w-full'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {income.map((expense) => (
            <tr className='text-center ' key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <th className='text-red-500 text-center'>
                <IconTrash />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className='flex flex-col p-8 gap-8'>
      <h1 className='text-4xl'>Income</h1>
      <div className='bg-white p-4 rounded-lg'>{content}</div>
    </div>
  );
};

export default Income;
