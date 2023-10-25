import { useEffect, useState } from 'react';
import { addExpense, deleteExpense, getExpenses } from '../api/ExpensesApi';
import { IconTrash } from '@tabler/icons-react';
import { Button, TextInput } from '@mantine/core';
import { Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { motion } from 'framer-motion';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState('');

  const form = useForm({
    initialValues: {
      description: '',
      amount: '',
      date: '',
    },
  });

  const addHandler = async (values) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formatDate = `${year}-${month}-${day}`;
    console.log(formatDate);
    try {
      const expense = {
        description: values.description,
        amount: values.amount,
        date: formatDate,
      };
      console.log('expense', expense);
      await addExpense(expense);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteHandler = async (id) => {
    console.log('id', id);
    try {
      await deleteExpense(id);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

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
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {expenses.map((expense) => (
            <Table.Tr key={expense.id}>
              <Table.Td>{expense.id}</Table.Td>
              <Table.Td>{expense.amount}</Table.Td>
              <Table.Td>{expense.description}</Table.Td>
              <Table.Td>{expense.date}</Table.Td>
              <Table.Td className='text-red-500 text-center cursor-pointer'>
                <IconTrash onClick={() => deleteHandler(expense.id)} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  }

  return (
    <>
      <div className='flex flex-col p-8 gap-8'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className='flex items-center justify-between'
        >
          <h1 className='text-4xl'>Expenses</h1>
          <Button
            onClick={() => open()}
            variant='filled'
            color='orange'
            radius='md'
            className='bg-indigo-500'
          >
            Add an expense
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className='bg-white p-4 rounded-lg'
        >
          {content}
        </motion.div>
      </div>

      {/* add modal */}
      <Modal opened={opened} onClose={close} title='Add expense' centered>
        <form
          onSubmit={form.onSubmit((values) =>
            addHandler(values).then((res) => {
              close();
            })
          )}
        >
          <TextInput
            label='Description'
            placeholder='Description'
            {...form.getInputProps('description')}
          />
          <TextInput
            type='number'
            label='Amount'
            placeholder='Amount'
            mt='md'
            {...form.getInputProps('amount')}
          />
          <DatePickerInput
            mt='md'
            valueFormat='DD/MM/YYYY'
            label='Pick date'
            placeholder='Pick date'
            value={date}
            onChange={setDate}
          />

          <div className='flex mt-4 justify-end gap-2'>
            <Button
              onClick={() => form.reset()}
              variant='subtle'
              type='submit'
              radius='md'
              mt='md'
            >
              Cancel
            </Button>
            <Button
              variant='filled'
              radius='md'
              className='bg-indigo-500'
              type='submit'
              mt='md'
            >
              Add expense
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Expenses;
