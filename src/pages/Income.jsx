import { useEffect, useState } from 'react';
import { addIncome, deleteIncome, getIncomes } from '../api/IncomeApi';
import { IconTrash } from '@tabler/icons-react';
import { Button, Pagination, TextInput } from '@mantine/core';
import { Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { motion } from 'framer-motion';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState('');

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

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
      const income = {
        description: values.description,
        amount: values.amount,
        date: formatDate,
      };

      await addIncome(income);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteHandler = async (id) => {
    console.log('id', id);
    try {
      await deleteIncome(id);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const fetchIncome = async () => {
    try {
      const response = await getIncomes(page, itemsPerPage);
      console.log('response:', response.results);
      setIncome(response.results);
      console.log('count', Math.floor(response.count / itemsPerPage));
      setCount(response.count);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [refresh, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setRefresh(!refresh);
  };

  let content;

  if (loading) {
    content = <p>Loading income...</p>;
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
          {income.map((income) => (
            <Table.Tr key={income.id}>
              <Table.Td>{income.id}</Table.Td>
              <Table.Td>{income.amount}</Table.Td>
              <Table.Td>{income.description}</Table.Td>
              <Table.Td>{income.date}</Table.Td>
              <Table.Td className='text-red-500 text-center cursor-pointer'>
                <IconTrash onClick={() => deleteHandler(income.id)} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  }

  return (
    <>
      <div className='h-screen flex flex-col p-8 gap-8'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className='flex items-center justify-between'
        >
          <h1 className='text-4xl'>Income</h1>
          <Button
            onClick={() => open()}
            variant='filled'
            radius='md'
            className='bg-indigo-500'
          >
            Add an income
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
        <Pagination
          className='mt-auto mx-auto '
          color='indigo'
          page={page}
          onChange={handlePageChange}
          total={Math.floor(count / itemsPerPage) + 1}
          itemsPerPage={itemsPerPage}
        />
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
            label='Date'
            placeholder='Date'
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
              Add income
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Income;
