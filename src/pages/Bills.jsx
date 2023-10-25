import { useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { Badge, Button, Radio, TextInput } from '@mantine/core';
import { Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { motion } from 'framer-motion';
import { addBill, deleteBill, getBills } from '../api/BillsApi';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('unpaid');

  const form = useForm({
    initialValues: {
      name: '',
      amount: '',
      date: '',
      status: '',
    },
  });

  const addHandler = async (values) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formatDate = `${year}-${month}-${day}`;
    console.log(formatDate);
    try {
      const bill = {
        name: values.name,
        amount: values.amount,
        due_date: formatDate,
        status: status,
      };
      console.log('bill', bill);
      await addBill(bill);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error adding bill:', error);
    }
  };

  const deleteHandler = async (id) => {
    console.log('id', id);
    try {
      await deleteBill(id);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error deleting bills:', error);
    }
  };

  const fetchBills = async () => {
    try {
      const response = await getBills();
      console.log('bills:', response);
      setBills(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  useEffect(() => {
    fetchBills();
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
            <Table.Th>Name</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Due Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {bills.map((bill) => (
            <Table.Tr key={bill.id}>
              <Table.Td>{bill.id}</Table.Td>
              <Table.Td>{bill.name}</Table.Td>
              <Table.Td>{bill.amount}</Table.Td>
              <Table.Td>{bill.due_date}</Table.Td>
              <Table.Td>
                {bill.status === 'unpaid' ? (
                  <Badge color='red'>Unpaid</Badge>
                ) : (
                  <Badge color='teal'>Paid</Badge>
                )}
              </Table.Td>
              <Table.Td className='text-red-500 text-center cursor-pointer'>
                <IconTrash onClick={() => deleteHandler(bill.id)} />
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
          <h1 className='text-4xl'>Bills</h1>
          <Button
            onClick={() => open()}
            variant='filled'
            color='orange'
            radius='md'
            className='bg-indigo-500'
          >
            Add a bill
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
            label='Name'
            placeholder='Name'
            {...form.getInputProps('name')}
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
            label='Due date'
            placeholder='Due date'
            value={date}
            onChange={setDate}
          />

          <Radio.Group
            value={status}
            onChange={setStatus}
            name='Bill status'
            label='Bill status'
            withAsterisk
            className=' mt-8'
          >
            <div className='flex  gap-8 mt-4'>
              <Radio value='unpaid' label='Unpaid' />
              <Radio value='paid' label='Paid' />
            </div>
          </Radio.Group>

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
              Add Bills
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Bills;
