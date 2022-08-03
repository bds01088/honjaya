import React, {useState} from 'react'
import ModeHetero from './ModeHetero'
import styled from 'styled-components'
import {
  MdRadioButtonUnchecked,
  MdRadioButtonChecked
} from 'react-icons/md'

// import M


const BottomBox = styled.div`
  /* position: relative; */
  /* outline: 0.2rem solid #333333; */
  width: 90%;
  height: 50%;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`

const LeftBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 30%;
  height: 100%;
  /* outline: 1px solid; */
`

const LeftBoxHeader = styled.div`
  position: absolute;
  font-family: "Jua";
  font-size: 1.5rem;
  color: #333333;
  top: 2.5rem;
  left: 5.5rem;
  z-index: 1;
  padding: 0 1rem;
  background-color: #fffdde;
  

`

const PersonnelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 0.2rem solid #333333;
  border-radius: 2rem;
  height: 50%;
  width: 60%;
  
`

const PersonnelRadio = styled.input`
  cursor: pointer;
  visibility: hidden;
`

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 30%;
  font-size: 1rem;
  margin: 0 1rem;
  font-family: "Jua";
  cursor: pointer;
  /* outline: 1px solid; */
`

const OppositeGender = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  cursor: pointer;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #00C3A9;
  }
  
`

const RadioIconOff = styled(MdRadioButtonUnchecked)`
  width: 40%;
  height: 30%;
`

const RadioIconOn = styled(MdRadioButtonChecked)`
  width: 40%;
  height: 30%;
`
const Start = styled.button`
`

const ModePageBottom = () => {

  const [personnel, setPersonnel] = useState('1')
  const handleClickRadioButton = (e) => {
    setPersonnel(e.target.value);
  }

  console.log(personnel)

  return(
    <BottomBox>
      <LeftBox>
        <LeftBoxHeader>인원선택</LeftBoxHeader>
        <PersonnelBox>

          <RadioLabel>
            {personnel === "1:1" ? ( 
              <RadioIconOn></RadioIconOn>
            ) : (
              <RadioIconOff></RadioIconOff>
            )} 1:1
            <PersonnelRadio 
              type="radio"
              value="1:1"
              checked={personnel === "1:1"}
              onChange={handleClickRadioButton}/>
          </RadioLabel>

          <RadioLabel>
            {personnel === "4" ? ( 
              <RadioIconOn></RadioIconOn>
            ) : (
              <RadioIconOff></RadioIconOff>
            )} 4인
            <PersonnelRadio 
              type="radio"
              value="4"
              checked={personnel === "4"}
              onChange={handleClickRadioButton}/>
          </RadioLabel>
 
        </PersonnelBox>

        <RadioLabel>
          <OppositeGender type="checkbox"/> 이성만
        </RadioLabel>
        
      </LeftBox>
      <Start>
        시작하기
      </Start>
    </BottomBox>
  )
}

export default ModePageBottom