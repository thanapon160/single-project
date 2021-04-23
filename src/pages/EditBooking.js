import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import Header from '../components/layout/Header'
import { Form, Input, Select, DatePicker, InputNumber, TimePicker, Button } from 'antd';
import doge2 from '../assets/images/doge2.png'
import moment from 'moment'

const { RangePicker } = TimePicker;
// const { RangePicker } = DatePicker  ;

function EditBooking() {
  const [rooms, setRooms] = useState([]);
  const [bookingListById, setBookingListById] = useState({});
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get('/rooms')
        setRooms(res.data.roomList)
      } catch (err) {
          console.dir(err)
      }
    }
    const getBookingListById = async () => {
      try {
        const res = await axios.get('/booking-lists/booking/' + params.bookingId)
        console.log(res.data.result)
        setBookingListById(res.data.result)
      } catch (err) {
        console.dir(err)
      }
    }
    getRoom();
    getBookingListById();
  }, [])

  const validateInput = (values) => {
    const newError = {};
    const { title, room, description, participantNumber } = values
    if (!title || title === "") newError.title = "title is required"
    if (!room || room === "") newError.room = "room is required"
    if (!description || description === "") newError.description = "description is required"
    if (!participantNumber || participantNumber === "") newError.participantNumber = "participant number is required"
  }

  const handleSubmit = async (values) => {
    console.log(values)
    validateInput(values);
    const date = values.date.format('YYYY-MM-DD')
    const startTime = values.time[0].format('HH:mm');
    const endTime = values.time[1].format('HH:mm');

    const { title, room, description, participantNumber } = values
    const startDateTime = date + 'T' + startTime + ':00+07:00';
    const endDateTime = date + 'T' + endTime + ':00+07:00';
    try {
      await axios.put('/booking-lists/edit/' + params.bookingId, {
        title, room, description, participantNumber, startDateTime, endDateTime
      });
      history.push('/profile')
    } catch (err) {
      console.dir(err)
    }
  }
  const date = moment(bookingListById.startDateTime)
  const startTime = moment(bookingListById.startDateTime)
  const endTime = moment(bookingListById.endDateTime)

  const AddBookingForm = () => {
    const onFinishFailed = (err) => {
      console.log('Failed: ', err)
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
          size={'default'}
          style={{ margin: '5rem' }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item hasFeedback label="Title" name='title'
            rules={[
              { required: true, message: 'Title is required' },
            ]}
            initialValue={bookingListById.title}
          >
            <Input />
            {/* {error.title && <span style={{ color: 'red' }}>{error.title}</span>} */}
          </Form.Item>
          <Form.Item hasFeedback label="Room" name='room' rules={[{ required: true, message: 'Room is required' }]}>
            <Select >
              {rooms.map(room => <Select.Option key={room.id} value={room.name}>{room.name} (Max: {room.capacity})</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item initialValue={date} hasFeedback label="Date" name='date' rules={[{ required: true, message: 'Date is required' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item initialValue={[startTime, endTime]} hasFeedback label="Time" name='time' rules={[{ required: true, message: 'Start & End time is required' }]}>
            <RangePicker minuteStep={15} format={'HH:mm'} autoFocus='true' />
          </Form.Item>
          <Form.Item label="Participant" name='participantNumber'>
            <InputNumber min={2} max={20} defaultValue={bookingListById.participantNumber} />
          </Form.Item>
          <Form.Item label="Description" name='description' initialValue={bookingListById.description}>
            <Input.TextArea showCount='true' maxLength='100' allowClear='true' />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='primary' htmlType='submit' style={{ marginRight: '1rem' }}>
              Submit
            </Button>
            <Button danger htmlType='buttons' onClick={function () { history.push("/") }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={doge2} alt="doge2"></img>
          <img src={doge2} alt="doge2" style={{ marginRight: '0px', transform: 'rotateY(180deg)' }}></img>
        </div>
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

export default EditBooking