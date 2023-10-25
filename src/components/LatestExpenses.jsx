import { useEffect, useState } from 'react';
import CardWithHeader from './CardWithHeader';
import { getExpenses } from '../api/ExpensesApi';
import { Table } from '@mantine/core';

const LatestExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses(1, 5);
      console.log('Expenses:', response);
      setExpenses(response.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  let content;

  if (loading) {
    content = <p>Loading expenses...</p>;
  } else {
    content = (
      <div className='h-36'>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {expenses.map((expense) => (
              <Table.Tr key={expense.id}>
                <Table.Td>{expense.id}</Table.Td>
                <Table.Td>{expense.amount}</Table.Td>
                <Table.Td>{expense.description}</Table.Td>
                <Table.Td>{expense.date}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    );
  }

  return <CardWithHeader title='Latest Expenses'>{content}</CardWithHeader>;
};

export default LatestExpenses;
