import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

function App() {

  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(e => e.json())
      .then(e => {
        const data = e.map(row=> <p key={row._id}>{row.calculation}</p>)
        setHistory(data);
      })

    return () => { };
  }, [history])

  const calculate = (e) => {
    e.preventDefault();

    let body = value;

    setValue(eval(value));

    body += ` = ${eval(value)}`;

    fetch('http://localhost:8000/add', {
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ calculation: body })
    })
  }

  const reset = (e) => {
    e.preventDefault();

    setValue("")
  }

  const buttons = () => {
    const result = [];
    for (let index = 1; index < 10; index++) {
      result.push(<Col xs={4} className='mb-2' lg={4}>
        <Button className='w-100' key={index} onClick={(e) => {
          e.preventDefault();
          setValue(value + index)
        }} variant='outline-dark'>{index}</Button>
      </Col>);
    }
    return result;
  }

  return (
    <div className="App">
      <Container>
        <Card className='mx-auto my-5'>
          <fieldset disabled>
            <Form.Group className="mb-3">
              <Form.Control value={value} id="disabledTextInput" readOnly placeholder="...." />
            </Form.Group>

          </fieldset>
          <Card.Body>
            <Row>
              <Col xs={12} md={8}>
                <Row>

                  {buttons()}

                  <Col xs={8} md={5}>
                    <Button onClick={(e) => {
                      e.preventDefault();
                      setValue(value + 0)
                    }} className='w-100' variant='outline-dark'>0</Button>
                  </Col>
                </Row>
              </Col>

              <Col xs={12} md={4}>
                <Row>
                  <Col md={12} className="my-2">
                    <Button size='lg' onClick={reset} className='w-100' variant='primary'>C</Button>
                  </Col>

                  <Col xs={6} md={6} className="mb-2">
                    <Button className='w-100' onClick={(e) => {
                      e.preventDefault();
                      setValue(value + " + ")
                    }} variant='primary' ><b>+</b></Button>
                  </Col>

                  <Col xs={6} md={6} className="mb-2">
                    <Button className='w-100' onClick={(e) => {
                      e.preventDefault();
                      setValue(value + " - ")
                    }} variant='primary' ><b>-</b></Button>
                  </Col>

                  <Col xs={6} md={6} className="mb-2">
                    <Button className='w-100' onClick={(e) => {
                      e.preventDefault();
                      setValue(value + " / ")
                    }} variant='primary' ><b>/</b></Button>
                  </Col>

                  <Col xs={6} md={6} className="mb-2">
                    <Button className='w-100' onClick={(e) => {
                      e.preventDefault();
                      setValue(value + " * ")
                    }} variant='primary' ><b>*</b></Button>
                  </Col>

                  <Col md={12} className="mb-2">
                    <Button size='lg' onClick={calculate} className='w-100' variant='danger'>=</Button>
                  </Col>


                </Row>

              </Col>


            </Row>

          </Card.Body>

        </Card>


        <div>
          <h5 className='text-center'>History</h5>
          {history}
        </div>
      </Container>
    </div>
  );
}

export default App;
