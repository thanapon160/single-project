import Header from '../components/layout/Header'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../config/axios'
import { InputGroup, FormControl } from 'react-bootstrap'

function AddUser() {
  const [position, setPosition] = useState([])
  const [error, setError] = useState('')
  const history = useHistory()
  const [input, setInput] = useState({
    email: '',
    firstName: '',
    lastName: '',
    position: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const getPosition = async () => {
      try {
        const res = await axios.get('/positions')
        setPosition(res.data.position)
      } catch (err) {
          console.dir(err)
      }
    }
    getPosition()
  }, [])

  const handleSumbit = async (e) => {
    try {
      e.preventDefault()
      // validateInput()
      const res = await axios.post('/admin', input );
      console.log(res)
      history.push('/home')
    } catch (err) {
      console.dir(err)
    }
  }
  console.log(input)
  return (
    <>
      <Header />
      <form onSubmit={handleSumbit} className="d-flex flex-column">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>First and last name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={input.firstName}
            onChange={(e) => setInput({...input, firstName: e.target.value })}
          />
          <FormControl
            value={input.lastName}
            onChange={(e) => setInput({...input, lastName: e.target.value })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Email
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={input.email}
            onChange={(e) => setInput({...input, email: e.target.value })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default" value="">
              Mobile
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={input.mobile}
            onChange={(e) => setInput({...input, mobile: e.target.value })}
          />
        </InputGroup>
        <span>Position: </span>
        <select name="position" onChange={(e) => setInput({...input, position: e.target.value })}>
          {position.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default" value="" type="password">
              Password
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={input.password}
            onChange={(e) => setInput({...input, password: e.target.value })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default" value="">
              Confirm Password
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={input.confirmPassword}
            onChange={(e) => setInput({...input, confirmPassword: e.target.value })}
          />
        </InputGroup>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginRight: '10px' }}
          >
            Submit
          </button>
          <button type="button" className="btn btn-outline-danger">
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default AddUser
