import React, { useState } from 'react'
import styled from 'styled-components'
import {
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const BottomBox = styled.div`
  width: 90%;
  height: 50%;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LeftBox = styled.div`
  display: flex;
  align-items: center;
  height: 20vh;
  width: 50vw;
`

const PersonnelBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 0.2rem solid #333333;
  border-radius: 2rem;
  height: 70%;
  width: 50%;
`

const Title = styled.div`
  position: absolute;
  font-family: 'Jua';
  font-size: 2rem;
  color: #333333;
  top: -1rem;
  z-index: 1;
  padding: 0 1rem;
  background-color: #fffdde;
`

const PersonnelRadio = styled.input`
  cursor: pointer;
  visibility: hidden;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 10rem;
  font-size: 1.5rem;
  margin: 0 1rem;
  font-family: 'Jua';
  cursor: pointer;
`

const RadioIconOff = styled(MdRadioButtonUnchecked)`
  width: 3rem;
  height: 3rem;
`

const RadioIconOn = styled(MdRadioButtonChecked)`
  width: 3rem;
  height: 3rem;
  color: #00c3a9;
`


const StartDiv = styled.div`
  display: flex;
  align-items: center;
`

const Start = styled.button`
  display: flex;
  border: none;
  border-radius: 1rem;
  color: white;
  font-family: Jua;
  font-size: 2.8rem;
  padding: 0.5rem 2rem;
  background: #ff728e;
  cursor: pointer;

  &:hover {
    background: #a04053;
    color: #c2c2c2;
  }
`

const ModePageBottom = ({ data, setData }) => {
  // 인원 선택 (라디오 버튼)
  const [personnel, setPersonnel] = useState("2")

  const handleClickRadioButton = (e) => {
    setPersonnel(e.target.value)
    setData({
      ...data,
      total: parseInt(e.target.value),
    })
  }

  const navigate = useNavigate()

  const moveToWait = () => {
    console.log(data)
    navigate('/waiting', data)
  }


  return (
    <BottomBox>
      <LeftBox>
        <PersonnelBox>
          <Title>인원선택</Title>

          <Label>
            {personnel === '2' ? (
              <RadioIconOn></RadioIconOn>
            ) : (
              <RadioIconOff></RadioIconOff>
            )}{' '}
            1:1
            <PersonnelRadio
              type="radio"
              value="2"
              checked={personnel === '2'}
              onChange={handleClickRadioButton}
            />
          </Label>

          <Label>
            {personnel === '4' ? (
              <RadioIconOn></RadioIconOn>
            ) : (
              <RadioIconOff></RadioIconOff>
            )}{' '}
            4인
            <PersonnelRadio
              type="radio"
              value="4"
              checked={personnel === '4'}
              onChange={handleClickRadioButton}
            />
          </Label>
        </PersonnelBox>
      </LeftBox>

      <StartDiv>
        <Start onClick={moveToWait}>시작하기</Start>
      </StartDiv>
    </BottomBox>
  )
}

export default ModePageBottom
