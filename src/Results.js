import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { recommendations,widget } from './spotifyService';
import './Results.css';
import { Spotify } from 'react-spotify-embed';


function getWidget(id) {
    const link = `https://open.spotify.com/track/${id}`;
    return (
        <Spotify wide link={link}></Spotify>
    );
}

const Results = () => {
  const location = useLocation();
  const { songId, token } = location.state || {};
  const [recos, setRecos] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (songId && token) {
        const recosData = await recommendations(token, songId);
        setRecos(recosData.tracks);
      }
    };
    fetchRecommendations();
  }, [songId, token]);

  return (
    <>
      <div className='container-for-songs'>
      {recos.slice(0, 10).map((reco) => (
  <div key={reco.id}>
    {getWidget(reco.id)}
  </div>
))}
      </div>
    </>
  );
};

export default Results;
