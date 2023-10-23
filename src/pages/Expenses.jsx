import React, { useEffect, useState } from 'react';
import { addExpense, getExpenses } from '../api/ExpensesApi';
import { IconTrash } from '@tabler/icons-react';
import { Button, Group, TextInput } from '@mantine/core';
import { Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DateInput, DatePickerInput } from '@mantine/dates';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState('');

  const form = useForm({
    initialValues: {
      description: '',
      amount: '',
      date: '2020-05-04',
    },
  });

  const addHandler = async (values) => {
    try {
      const expense = {
        description: values.description,
        amount: values.amount,
        date: value.split(':'),
      };
      await addExpense(expense);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error adding expense:', error);
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
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {expenses.map((expense) => (
            <Table.Tr key={expense.id}>
              <Table.Td>{expense.id}</Table.Td>
              <Table.Td>{expense.amount}</Table.Td>
              <Table.Td>{expense.description}</Table.Td>
              <Table.Td className='text-red-500 text-center'>
                <IconTrash />
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
        <div className='flex items-center justify-between'>
          <h1 className='text-4xl'>Expenses</h1>
          <Button
            onClick={() => open()}
            variant='filled'
            color='orange'
            radius='md'
            className='bg-orange-500'
          >
            Button
          </Button>
        </div>

        <div className='bg-white p-4 rounded-lg'>{content}</div>
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
            valueFormat='YYYY-MMM-DD'
            label='Pick date'
            placeholder='Pick date'
            value={value}
            onChange={setValue}
          />

          <div className='flex mt-4 justify-end gap-2'>
            <Button
              onClick={() => form.reset()}
              variant='subtle'
              type='submit'
              mt='md'
            >
              Annuler
            </Button>
            <Button type='submit' mt='md'>
              Ajouter
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Expenses;
