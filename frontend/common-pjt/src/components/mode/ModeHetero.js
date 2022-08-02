import React, {useState} from "react"
import Checkbox from '@mui/material/Checkbox'
import styled from "styled-components"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const ModeHetero = () => {
  
  const [hetero, setHetero] = useState(false)
  console.log(hetero)
  const handleClickCheckBox = ({target}) => {
    target.checked ? setHetero(true) : setHetero(false);
  }
  

  return (
    <Container>
      <FormGroup>
        <FormControlLabel 
          control={<Checkbox/>} 
          label="이성만"
          onChange={handleClickCheckBox}
           />
      </FormGroup>
    </Container>
  )
}

export default ModeHetero;

const Container = styled.div`
  position: relative;
  display: flex;
  left: 28%;
  top: 3.3rem;
`