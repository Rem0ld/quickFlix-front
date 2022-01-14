import React from 'react'
import "/node_modules/video-react/dist/video-react.css";
import {Player} from 'video-react'

const MyPlayer = (): JSX.Element => {
  return ( <Player
    playsInline
    poster="/assets/poster.png"
    src="http://localhost:3050/api/Rick.and.Morty.S05E01.720p.AMZN.WEBRip.x264-GalaxyTV.mkv"
    height={600}
  />)
}

export default MyPlayer