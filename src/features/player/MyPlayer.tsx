import React from 'react'
import "/node_modules/video-react/dist/video-react.css";
import {Player} from 'video-react'

const MyPlayer = (): JSX.Element => {
  return ( <Player
    playsInline
    poster="/assets/poster.png"
    src="http://localhost:3050/api/Dexter.New.Blood.S01E01.mp4"
  />)
}

export default MyPlayer