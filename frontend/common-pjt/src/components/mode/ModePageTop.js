import React, { useState } from 'react'
import styled from 'styled-components'
import TempImg from '../../assets/character.png'


const ModeSelectBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  outline: 0.2rem solid #333333;
  width: 90%;
  height: 60%;
  border-radius: 2rem;
  padding: 1rem 0;
`
const Text = styled.div`
  position: absolute;
  top: -1.7rem;
  z-index: 1;
  padding: 0 2rem;
  font-size: 2rem;
  background-color: #fffdde;
  font-family: 'Jua';

`

const Mode = styled.img`
  /* height: 90%; */
  width: 90%;
  cursor: pointer;
`

const LabelDiv = styled.div`
  
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* margin:0; */
`
const Label = styled.label`
  width: 100%;
  height: 100%;
`

const Input = styled.input`
  visibility: hidden;
  
  :checked + img {
    outline: 0.2rem solid #ffc9d0;
    border-radius: 2rem;
  }
`

const Explain = styled.p`
  font-family: 'Jua';
  font-size: 1.2rem;
  cursor: pointer;
  color: #333333;
  text-align: center;
`

const ModeChoice = () => {

  const [x, setX] = useState('')
  const handleClickRadioButton = (e) => {
    setX(e.target.value)
  }

  console.log(x)
  return (
    <ModeSelectBox className="box">
      <Text>역할선택</Text>
      <LabelDiv>
        <Label>
          <Input
            type="radio"
            value="Solo"
            checked={x === 'Solo'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>싱글로 즐기기</Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <Label>
          <Input
            type="radio"
            value="Commander"
            checked={x === 'Commander'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>지시자로 즐기기</Explain>
        </Label>
      </LabelDiv>
      
      <LabelDiv>
        <Label>
          <Input
            type="radio"
            value="Avatar"
            checked={x === 'Avatar'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>아바타로 즐기기</Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <Label>
          <Input
            type="radio"
            value="Random"
            checked={x === 'Random'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>랜덤으로 즐기기</Explain>
        </Label>
      </LabelDiv>
    </ModeSelectBox>
  )
}

export default ModeChoice
