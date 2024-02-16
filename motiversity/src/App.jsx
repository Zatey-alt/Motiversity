import React, { useState, useEffect } from 'react';
import axios from 'axios';
import song1 from './assets/s1.mp3';
import song2 from './assets/s2.mp3';
import song3 from './assets/s3.mp3';
import song4 from './assets/s4.mp3';
import Loader from './components/Loader';



const QuoteApp = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Create a playlist with imported songs
  const playlist = [song1, song2, song3, song4];

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true); // Set loading state to true when fetching data
        const quoteResponse = await axios.get('https://api.quotable.io/random');
        setQuote(quoteResponse.data.content);
        setAuthor(quoteResponse.data.author);
        const imageResponse = await axios.get('https://source.unsplash.com/random');
        setImage(imageResponse.request.responseURL);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after data is fetched
      }
    };

    // Play the next song and fetch new quote and image every 20 seconds
    const interval = setInterval(() => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
      fetchQuote();
    }, 20000);

    // Clean up the interval
    return () => clearInterval(interval);
  }, [playlist]);

  return (
    <div className="app">
  
  
      <div className="quote-container">
      {isLoading ? ( // Conditionally render loading screen
        <div className="loading-screen"><Loader/></div>
      ) : (
        <>
          <div className="quote">
            <p>"{quote}"</p>
            <p>- {author}</p>
          </div>
          <div className="image">
            <img src={image} alt="Random" />
          </div>
        </>
      )}
      {playlist.map((song, index) => (
        <audio key={index} src={song} autoPlay={currentSongIndex === index} />
      ))}
    </div>
    </div>
    
  );
};

export default QuoteApp;
