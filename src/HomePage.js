// HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, searchTracks } from './spotifyService';
import './HomePage.css';
const HomePage = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [selected,setSelected] = useState(false);
  const navigate = useNavigate();

const[selectedSongID,setSelectedSongID] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };
    fetchAccessToken();
  }, []);

  const handleChange = async (event) => {
    const newValue = event.target.value;
    setInput(newValue);
    if (newValue) {
      const results = await searchTracks(accessToken, newValue);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelected(true);
    setInput(suggestion.name);   
    setSelectedSongID(suggestion.id);
    setSuggestions([]);
  };

  const handleNavigate = () => {
    if(selected){
    navigate('/newpage', { state: { data: selectedSongID, secdata : accessToken } });
    }
    else{
        console.log("provide a selection");
    }
  };

  return (
    <>
        <div className='content-container'>
            <form>
            <div className='input-container'>
                <input
                typeof='text'
                placeholder='Song name...'
                value={input}
                onChange={handleChange}>
                </input>
                {suggestions.length > 0 &&(
                    <div
                className='suggestions-container'>
                  {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  action
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name} - {suggestion.artists.map(artist => artist.name).join(', ')}
                </li>
              ))}

                </div>)}
                <button
                onClick={handleNavigate}>
                    SEARCH
                </button>
            </div>
            </form>
        </div>
    
    
    </>
  );
};

export default HomePage;
