import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { recommendations } from './spotifyService';

const NewPage = () => {
  const location = useLocation();
  const { data, secdata } = location.state || {};
  const [recos, setRecos] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (secdata && data) {
        const recosData = await recommendations(secdata, data);
        setRecos(recosData.tracks);
      }
    };
    fetchRecommendations();
  }, [data, secdata]);

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <h1>Data from Home Page: {data} plus {secdata}</h1>
          <ul>
            {recos.map((reco) => (
              <li key={reco.id}>
                {reco.name}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default NewPage;
