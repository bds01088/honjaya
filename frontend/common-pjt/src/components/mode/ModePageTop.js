import React, { useState } from 'react'
import styled from 'styled-components'
import TempImg from '../../assets/character.png'


const ModeSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  outline: 0.2rem solid #333333;
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
  font-size: 2.8em;
  background-color: #fffdde;
  font-family: 'Jua';
`
const ModeTitle = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-family: "Jua";
  width: 80%;
  background-color: #FFC9D0;
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
    outline: 0.2rem solid #ffc9d0;
    border-radius: 2rem;
  }
`

const Explain = styled.div`
  text-align: center;
  font-family: 'Jua';
  font-size: 1.3rem;
  color: #333333;
  cursor: pointer;
  /* outline: 2px solid; */
`

const ModeChoice = ({ data, setData }) => {

  const [Role, setRole] = useState("1")
  const handleClickRadioButton = (e) => {
    setRole(e.target.value)
    setData({
      ...data, roleCode: parseInt(e.target.value)
    })
  }

  return (
    <ModeSelectBox className="box">
      <RoleSelectTitle>역할선택</RoleSelectTitle>

      <LabelDiv>
        <ModeTitle>"어, 싱글이야"로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="1"
            checked={Role === "1"}
            onChange={handleClickRadioButton}/>
          <Mode src={TempImg}></Mode>
          <Explain>
            역할 없이 즐기고 싶을 땐
          </Explain>
          <Explain>
            싱글모드로 참여해보세요.
          </Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <ModeTitle>지시자로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="2"
            checked={Role === '2'}
            onChange={handleClickRadioButton}/>
          <Mode src={TempImg}></Mode>
          <Explain>
            지시자로 참여해서
          </Explain>
          <Explain>
          아바타에게 지시를 내려보세요. 
          </Explain>
        </Label>
      </LabelDiv>
    
      <LabelDiv>
        <ModeTitle>아바타로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="3"
            checked={Role === '3'}
            onChange={handleClickRadioButton}/>
          <Mode src={TempImg}></Mode>
          <Explain>
            아바타로 참여해서 
          </Explain>
          <Explain>
          색다른 경험을 해보세요. 
          </Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <ModeTitle>랜덤 역할로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="4"
            checked={Role === '4'}
            onChange={handleClickRadioButton}/>
          <Mode src={TempImg}></Mode>
          <Explain>
            역할을 고르기 힘들다면
          </Explain>
          <Explain>
            랜덤모드로 참여해보세요.
          </Explain>
        </Label>
      </LabelDiv>
    </ModeSelectBox>
  )
}

export default ModeChoice
