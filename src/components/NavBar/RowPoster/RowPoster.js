// import React, { useEffect, useState } from 'react';
// import Youtube from 'react-youtube';
// import axios from '../../../axios';
// import { imageUrl, API_KEY } from '../../../constants/constants';
// import './RowPoster.css';

// function RowPoster(props) {
//   const [movie, setMovie] = useState([]);
//   const [playingVideoId, setPlayingVideoId] = useState(null);

//   useEffect(() => {
//     axios
//       .get(props.url)
//       .then((response) => {
//         console.log(response.data);
//         setMovie(response.data.results);
//       })
//       .catch((err) => {
//         alert('Network Error');
//       });
//   }, []);

//   const opts = {
//     height: '390',
//     width: '100%',
//     playerVars: {
//       autoplay: 0,
//     },
//   };

//   const handleMovie = (id) => {
//     axios
//       .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
//       .then((response) => {
//         if (response.data.results.length > 0) {
//           setPlayingVideoId(response.data.results[0].key);
//         } else {
//           console.log('No video found');
//           setPlayingVideoId(null); // Reset the playingVideoId if no video found
//         }
//       })
//       .catch((error) => {
//         console.log('Error fetching video:', error);
//       });
//   };

//   const onPlay = (event) => {
//     const player = event.target;
//     // Pause other trailers if any are playing
//     if (playingVideoId && playingVideoId !== player.getVideoEmbedCode()) {
//       player.pauseVideo();
//     }
//   };

//   const onPause = () => {
//     // You can add any additional logic here if needed
//   };

//   return (
//     <div className='row'>
//       <h2>{props.title}</h2>
//       <div className='posters'>
//         {movie.map((obj) => (
//           <img
//             key={obj.id}
//             onClick={() => handleMovie(obj.id)}
//             className={props.isSmall ? 'smallPoster' : 'poster'}
//             src={`${imageUrl + obj.backdrop_path}`}
//             alt='poster'
//           />
//         ))}
//       </div>
//       {playingVideoId && (
//         <Youtube
//           opts={opts}
//           videoId={playingVideoId}
//           onPlay={onPlay}
//           onPause={onPause}
//         />
//       )}
//     </div>
//   );
// }

// export default RowPoster;
import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import axios from '../../../axios';
import { imageUrl, API_KEY } from '../../../constants/constants';
import './RowPoster.css';

function RowPoster(props) {
  const [movie, setMovie] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data.results);
      })
      .catch((err) => {
        alert('Network Error');
      });
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleMovie = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length > 0) {
          setPlayingVideoId(response.data.results[0].key);
        } else {
          console.log('No video found');
          setPlayingVideoId(null); // Reset the playingVideoId if no video found
        }
      })
      .catch((error) => {
        console.log('Error fetching video:', error);
      });
  };

  const onPlay = () => {
    setIsTrailerPlaying(true);
  };

  const onPause = () => {
    setIsTrailerPlaying(false);
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movie.map((obj) => (
          <img
            key={obj.id}
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl + obj.backdrop_path}`}
            alt='poster'
          />
        ))}
      </div>
      {playingVideoId && (
        <Youtube
          opts={opts}
          videoId={playingVideoId}
          onPlay={onPlay}
          onPause={onPause}
        />
      )}
      {isTrailerPlaying && (
        <div className='trailer-overlay'>
          <p>Trailer is currently playing. Please wait.</p>
        </div>
      )}
    </div>
  );
}

export default RowPoster;




