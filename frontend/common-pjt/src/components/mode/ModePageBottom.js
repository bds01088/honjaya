import React, { useState } from 'react'
import styled from 'styled-components'
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRoleCode, setTotal } from './mode-slice'
import { setResult, setVote, setConnections } from '../meeting/vote-slice'

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
  border: 0.2rem solid #363636;
  border-radius: 2rem;
  height: 70%;
  width: 50%;
`

const Title = styled.div`
  position: absolute;
  font-family: Minseo;
  font-size: 2rem;
  font-weight: bold;
  color: #363636;
  top: -1rem;
  z-index: 1;
  padding: 0 1rem;
  background-color: #fae8e8;
  border-radius: 1rem;
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
  font-size: 1.8rem;
  margin: 0 1rem;
  font-family: Minseo;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
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
  text-decoration: none;
  background-color: #f38ba0;
  font-size: 3rem;
  font-family: Minseo;
  font-weight: 500;
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 2rem;
  border: 5px dashed #ffd2d2;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #df7086;
    border: 5px dashed #f7b9b9;
    color: #d8d4d4;
    font-size: 3.1rem;
  }
`

const ModePageBottom = ({ data, setData }) => {
  const dispatch = useDispatch()
  // 인원 선택 (라디오 버튼)
  const [personnel, setPersonnel] = useState('2')

  const handleClickRadioButton = (e) => {
    setPersonnel(e.target.value)
    setData({
      ...data,
      total: parseInt(e.target.value),
    })
  }

  const history = useHistory()

  const moveToWait = () => {
    dispatch(setTotal(data.total))
    dispatch(setRoleCode(data.roleCode))
    dispatch(setResult())
    dispatch(setVote())
    dispatch(setConnections())
    history.push('/waiting')
  }

  return (
    <BottomBox>
      <LeftBox>
        <PersonnelBox>
          <Title>인원선택</Title>

          <Label>
            {personnel === '2' ? <RadioIconOn/> : <RadioIconOff/>}{' '}
            1:1
            <PersonnelRadio
              type="radio"
              value="2"
              checked={personnel === '2'}
              onChange={handleClickRadioButton}
            />
          </Label>

          <Label>
            {personnel === '4' ? <RadioIconOn/> : <RadioIconOff/>}{' '}
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
