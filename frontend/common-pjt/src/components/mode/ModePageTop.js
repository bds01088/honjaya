import React, { useState } from 'react'
import styled from 'styled-components'
import SoloImg from '../../assets/solo.png'
import AvatarImg from '../../assets/avatar.png'
import CommanderImg from '../../assets/commander.png'
import RandomImg from '../../assets/random.png'

const ModeSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  outline: 0.2rem solid #363636;
  width: 90%;
  height: 80%;
  border-radius: 2rem;
  padding: 1rem 0;
`

const RoleSelectTitle = styled.div`
  position: absolute;
  top: -2rem;
  z-index: 1;
  padding: 0 2rem;
  font-size: 2.8rem;
  font-weight: bold;
  background-color: #fffdde;
  color: #363636;
  font-family: Minseo;
  border-radius: 1rem;
`
const ModeTitle = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-family: Minseo;
  width: 80%;
  background-color: #ffc9d0;
  border-radius: 2rem;
  padding: 0.5rem;
`

const Mode = styled.img`
  width: 100%;
  cursor: pointer;
`

const LabelDiv = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 90%;
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 80%;
  height: 100%;
`

const Input = styled.input`
  visibility: hidden;

  :checked + img {
    outline: 0.2rem solid #f7adb7;
    background-color: #f7adb7;
    border-radius: 2rem;
  }
  & + img {
    margin-bottom: 0.5rem;

    &:hover {
      outline: 0.4rem solid #ffc9d0;
      border-radius: 2rem;
    }
  }
`

const Explain = styled.div`
  text-align: center;
  font-family: Minseo;
  font-size: 1.5rem;
  color: #333333;
  cursor: pointer;
`

const ModeChoice = ({ data, setData }) => {
  const [Role, setRole] = useState('1')

  const handleClickRadioButton = (e) => {
    setRole(e.target.value)

    setData({
      ...data,
      roleCode: parseInt(e.target.value),
    })
  }

  return (
    <ModeSelectBox className="box">
      <RoleSelectTitle>????????????</RoleSelectTitle>

      <LabelDiv>
        <ModeTitle>"???, ????????????"??? ????????????</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="1"
            checked={Role === '1'}
            onChange={handleClickRadioButton}
          />
          <Mode src={SoloImg}></Mode>
          <Explain>"?????? ??????" ????????? ?????? ???</Explain>
          <Explain>??????????????? ??????????????????.</Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <ModeTitle>???????????? ????????????</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="2"
            checked={Role === '2'}
            onChange={handleClickRadioButton}
          />
          <Mode src={AvatarImg}></Mode>
          <Explain>???????????? ????????????</Explain>
          <Explain>????????? ????????? ????????????.</Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <ModeTitle>???????????? ????????????</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="3"
            checked={Role === '3'}
            onChange={handleClickRadioButton}
          />
          <Mode src={CommanderImg}></Mode>
          <Explain>???????????? ????????????</Explain>
          <Explain>??????????????? ????????? ???????????????.</Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <ModeTitle>?????? ????????? ????????????</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="4"
            checked={Role === '4'}
            onChange={handleClickRadioButton}
          />
          <Mode src={RandomImg}></Mode>
          <Explain>????????? ???????????????</Explain>
          <Explain>??????????????? ??????????????????.</Explain>
        </Label>
      </LabelDiv>
    </ModeSelectBox>
  )
}

export default ModeChoice
