// spotifyService.js

export const CLIENT_ID = 'c6f2a6da49124f2f8ccf95b22cebeae6';
export const CLIENT_SECRET = '467c9ea7ed6c442fbdb0b09e8bf1eb72';

export const getAccessToken = async () => {
  const authParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  };
  const response = await fetch("https://accounts.spotify.com/api/token", authParams);
  const data = await response.json();
  return data.access_token;
};

export const searchTracks = async (accessToken, query) => {
  const songParam = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  };
  const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, songParam);
  const data = await result.json();
  return data.tracks.items;
};

export const recommendations = async (accessToken, songId) => {
    const recParams = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const recoResult = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${songId}`, recParams);
    const data = await recoResult.json();
    console.log(data);
    return data || []; 
  }


  export const widget = async(songId,name) => {
    var uri = 'https://open.spotify.com/embed/track/' + songId;
    return (
        <iframe
        title={name}
        src={uri}
        width="300"
        height="380"
  
        allowtransparency="true"
        allow="encrypted-media"
      >A</iframe>
    );

  }
  