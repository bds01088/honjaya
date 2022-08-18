import React from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

const ReactAudioPlayerBlock = styled.div`
    width: 0;
    height: 0;
    display: none;
`

const ReactAudioPlayer = ({Url, isPlaying, Volume}) => {
    return (
        <ReactAudioPlayerBlock>
            <ReactPlayer className='react-player'
            url={Url} 
            height="0px"
            width="0px"  
            playing={isPlaying} 
            loop={true} 
            controls={false}
            volume={Volume}
             />
        </ReactAudioPlayerBlock>
    )
}
export default ReactAudioPlayer