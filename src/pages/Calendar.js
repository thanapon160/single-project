import { Calendar, Badge } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/layout/Header'

function BookingCalendar() {
  const [bookingLists, setBookingLists] = useState([]);

  useEffect(() => {
    const result = async () => {
      try {
        const res = await axios.get('/booking-lists')
        setBookingLists(res.data.result);
      } catch(err) {
        console.dir(err)
      }
    }
    result();
  }, [])

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 20:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  console.log(bookingLists.map(item => (
    item.title
  )))

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
        {value.date() === 2 && bookingLists.map((item, index) => (
          <p key={index}>
            <Badge status={'success'} title={item.title} text={item.title}/>
          </p>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }


  return (
    <>
      <Header />
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </>
  )
}

export default BookingCalendar