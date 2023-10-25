import { Button, Modal, Radio, TextInput } from '@mantine/core';
import CardWithHeader from './CardWithHeader';
import { useEffect, useState } from 'react';
import { addBill, getBills } from '../api/BillsApi';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

const UpcomingBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState('unpaid');

  const form = useForm({
    initialValues: {
      name: '',
      amount: '',
      date: '',
      status: '',
    },
  });

  const fetchBills = async () => {
    try {
      const response = await getBills();
      console.log('bills:', response);
      const filteredBills = response.filter((bill) => bill.status === 'unpaid');
      setBills(filteredBills);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

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

  useEffect(() => {
    fetchBills();
  }, [refresh]);

  return (
    <>
      <CardWithHeader title='Upcoming Bills'>
        <div className='flex gap-2 '>
          <Button
            onClick={() => open()}
            variant='outline'
            className='h-auto border-indigo-300'
          >
            Add Bill
          </Button>
          {loading ? (
            <p>Loading bills...</p>
          ) : (
            <div className='overflow-x-auto'>
              <div className='flex gap-2 w-full'>
                {bills.map((bill) => (
                  <CardWithHeader key={bill.id} title={bill.name}>
                    <p className='text-black font-bold'>$ {bill.amount}</p>
                    <p className='text-gray-400 text-sm'>{bill.due_date}</p>
                  </CardWithHeader>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardWithHeader>

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

export default UpcomingBills;
