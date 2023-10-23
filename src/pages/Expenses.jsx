import React, { useEffect, useState } from 'react';
import { getExpenses } from '../api/ExpensesApi';
import { IconTrash } from '@tabler/icons-react';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      console.log('Expenses:', response);
      setExpenses(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  let content;

  if (loading) {
    content = <p>Loading expenses...</p>;
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
          {expenses.map((expense) => (
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
      <h1 className='text-4xl'>Expenses</h1>
      <div className='bg-white p-4 rounded-lg'>{content}</div>
    </div>
  );
};

export default Expenses;
