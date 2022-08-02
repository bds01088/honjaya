import React, { useState } from "react"
import styled from "styled-components"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { pink } from '@mui/material/colors';
import { green } from '@mui/material/colors';


const ModePersonnel = () => {

  const [personnel, setPersonnel] = useState('1')
  const handleClickRadioButton = (e) => {
    setPersonnel(e.target.value);
  }

  console.log(personnel)
  return (
    <>
      <ModeSelectBox >
        <Header><Text>인원선택</Text></Header>
        <Container>
          <FormControl>
            <RadioGroup row>

              <FormControlLabel 
                value="1" 
                control={<Radio 
                          sx={{
                            color: pink[100],
                            '&.Mui-checked' : {
                              color: pink[300],
                            }
                          }} />} 
                // label="1:1" 
                checked={personnel==='1'}
                onChange={handleClickRadioButton}/>
                <Label1>1:1</Label1>

              <FormControlLabel 
              value="4" 
              control={<Radio 
                        sx={{
                          color: green[300],
                          '&.Mui-checked' : {
                            color: green[600],
                          }
                        }} 
                        id='4'/>} 
              // label="4인"
              checked={personnel==='4'}
              onChange={handleClickRadioButton}/>
              <Label2 htmlFor='4'>4인</Label2>
            </RadioGroup>
          </FormControl>
        </Container>
      </ModeSelectBox>


    </>
  )
}

export default ModePersonnel

const Header = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Jua';
  text-align: center;
  font-size: 1.5rem;
  
`

const ModeSelectBox=styled.div`
    display: flex;
    position: absolute;
    justify-content: space-between;
    flex-direction: column;
    outline: 0.2rem solid #000;
    width: 20%;
    height: 15%;
    left: 4.7rem;
    margin-top:1rem;
    border-radius: 2rem;
` 

const Container = styled.div`
  display: flex;
  position: relative;
  top: -2rem;
  margin: 0 auto;
`
const Text = styled.p`
  position: relative;
  top: -0.7rem;
  z-index: 1;
  padding: 0 1rem;
  font-size: 1.5rem;
  background-color: #fffdde;
  font-family: 'Jua';
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 370px) {
    font-size: 0.5rem;
  }
  
`

const Label1= styled.label`
  font-family: 'Jua';
  position: absolute;
  top: 0.5rem;
  left: 2rem;
`
const Label2= styled.label`
  font-family: 'Jua';
  position: absolute;
  top: 0.5rem;
  left: 4.2rem;
`