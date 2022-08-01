import React from "react"
import styled from 'styled-components'
import ModeListItem from "./ModeListItem"

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ModeList = () => {
    const indexes = [0, 1, 2, 3]

    return (
        <Container>
            
            {indexes.map( i => (
                
                    <ModeListItem key={i} i={i} />
                
            ))}
        </Container>
 
    )
}

export default ModeList