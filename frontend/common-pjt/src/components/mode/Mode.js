import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ModeHeader from './ModeHeader'
import ModePageTop from './ModePageTop'
import ModePageBottom from './ModePageBottom'
import { useDispatch } from 'react-redux'
import { loadUser } from '../auth/login/login-slice'
import backImg from '../../assets/base.PNG'

const Background = styled.div`
  background-image: url(${backImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const ModeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 94%;
  padding: 1% 3% 0% 3%;
  height: 85%;
`

// 모드 default = [Solo, 1:1, 성별무관]
const Mode = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const [data, setData] = useState({
    total: 2,
    roleCode: 1,
  })

  return (
    <Background>
      <ModeHeader />
      <ModeContainer>
        {/* 역할 선택 */}
        <ModePageTop setData={setData} data={data} />

        {/* 인원, 성별 선택 */}
        <ModePageBottom setData={setData} data={data} />
      </ModeContainer>
    </Background>
  )
}

export default Mode
