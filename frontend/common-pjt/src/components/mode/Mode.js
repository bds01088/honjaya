import React from "react"
import styled from 'styled-components'
import ModeHeader from "./ModeHeader"
import ModeChoice from "./ModeChoice"

const Background = styled.div`
    background-color: #FFFDDE;
    width: 100vw;
    height: 100vh;    
    overflow: hidden;    
`

const Mode = () => {
    return (
        <Background>
            <ModeHeader/>
            <ModeChoice></ModeChoice>
        </Background>
    )
};

export default Mode