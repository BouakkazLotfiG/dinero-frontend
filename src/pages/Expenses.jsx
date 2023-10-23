import React, { useEffect } from 'react';
import { getExpenses } from '../api/ExpensesApi';

const Expenses = () => {
  const [expenses, setExpenses] = React.useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await getExpenses();
      console.log(response);
    };

    fetchExpenses();
  }, []);

  return <div className='bg-pink-400'>Expenses</div>;
};

export default Expenses;
