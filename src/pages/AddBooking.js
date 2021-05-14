import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Header from '../components/layout/Header'
import { Form, Input, Select, DatePicker, InputNumber, TimePicker, Button, message } from 'antd';
import doge2 from '../assets/images/doge2.png'

const { RangePicker } = TimePicker;

function AddBooking() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get('/rooms')
        setRooms(res.data.roomList)
      } catch (err) {
        setError(err.response.data.message)
      }
    }
    getRoom();
  }, [])

  const validateInput = (values) => {
    const newError = {};
    const { title, room, description, participantNumber } = values
    if (!title || title === "") newError.title = "title is required"
    if (!room || room === "") newError.room = "room is required"
    if (!description || description === "") newError.description = "description is required"
    if (!participantNumber || participantNumber === "") newError.participantNumber = "participant number is required"
    setError(newError)
  }

  const success = () => { message.success("Add booking success", 5) }

  const handleSubmit = async (values) => {
    console.log(values)
    validateInput(values);
    console.log(error.title)
    const date = values.date.format('YYYY-MM-DD')
    const startTime = values.time[0].format('HH:mm');
    const endTime = values.time[1].format('HH:mm');

    const { title, room, description, participantNumber } = values
    const startDateTime = date + ' ' + startTime
    const endDateTime = date + ' ' + endTime
    try {
      await axios.post('/booking-lists', {
        title, room, description, participantNumber, startDateTime, endDateTime
      });
      history.push('/profile')
      success();
    } catch (err) {
      console.dir(err)
    }

  }

  const AddBookingForm = () => {
    const [componentSize, setComponentSize] = useState('default');

    const onFinishFailed = (err) => {
      console.log('Failed: ', err)
    };

    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    return (
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{ margin: '5rem' }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item hasFeedback label="Title" name='title'
            rules={[
              { required: true, message: 'Title is required' },
              // {validator: (_, value) => value=='test' ? Promise.resolve() : Promise.reject(new Error('Holy Shit'))}
            ]}>
            <Input />
            {/* {error.title && <span style={{ color: 'red' }}>{error.title}</span>} */}
          </Form.Item>
          <Form.Item hasFeedback label="Room" name='room' rules={[{ required: true, message: 'Room is required' }]}>
            <Select>
              {rooms.map(room => <Select.Option key={room.id} value={room.name}>{room.name} (Max: {room.capacity})</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item hasFeedback label="Date" name='date' rules={[{ required: true, message: 'Date is required' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item hasFeedback label="Time" name='time' rules={[{ required: true, message: 'Start & End time is required' }]}>
            <RangePicker minuteStep={15} format={'HH:mm'} autoFocus='true' />
          </Form.Item>
          <Form.Item label="Participant" name='participantNumber'>
            <InputNumber min={2} max={20} />
          </Form.Item>
          <Form.Item label="Description" name='description'>
            <Input.TextArea showCount='true' maxLength='100' allowClear='true' />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='primary' htmlType='submit' style={{ marginRight: '1rem' }}>
              Submit
            </Button>
            <Button danger htmlType='reset'>
              Cancel
            </Button>
          </Form.Item>
        </Form>
        {/* <img src={doge2} alt="doge2"></img> */}
      </>
    );
  };

  return (
    <>
      <Header />
      <AddBookingForm />
    </>
  )
}

export default AddBooking