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
  

    return (
        <Container>
            
            {/* {indexes.map( i => (
                
                    <ModeListItem key={i} i={i} />
                
            ))} */}
            <ModeListItem />

       
        </Container>
 
    )
}

export default ModeList