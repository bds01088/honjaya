import React from "react"
import styled from "styled-components"

const ModeSelectBox=styled.div`
    display: flex;
    position: absolute;
    justify-content: space-between;
    flex-direction: column;
    outline: 0.2rem solid #000;
    width: 20%;
    height: 20%;
    left: 4.7rem;
    margin-top:1rem; 
    border-radius: 2rem;
` 


const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-family: 'Jua';
  text-align: center;
  
`
const ModePersonnel = () => {
  return (
    <ModeSelectBox >
      <H2>인원선택</H2>
    </ModeSelectBox>
    
  )
}

export default ModePersonnel