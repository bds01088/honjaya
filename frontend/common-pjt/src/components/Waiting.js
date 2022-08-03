import styled from 'styled-components'
import logoImg from '../assets/logo.png'
import React, { Component } from 'react'
import { MdHelpOutline } from 'react-icons/md'

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: relative;
`

const Header = styled.div`
  position: absolute;
  top: 1%;
  left: 0;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.img.attrs({ src:`${logoImg}` })`
  height: 100%;
  margin: 0 2rem;
`

const Helper = styled(MdHelpOutline)`
  height: 100%;
  width: 2.5rem;
  margin: 0 2rem;
  color: #333333;
`

class Waiting extends Component {
  constructor() {			// 1. 호출된다.
    super();

    this.state = {
      date: new Date()			// 2. 현재 시간으로 초기화
    };
  }

  componentDidMount() {			// 5. 함수 호출
    this.timerID = setInterval(		// 6. timer 추가
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {		// 8. DOM에서 Clock 컴포넌트 삭제 -> 함수 호출
    clearInterval(this.timerID);	// 9. timer stopped
  }

  tick() {
    this.setState({
      date: new Date()			// 7. this.state.date 값 변화(매초)
    });
  }

  render() {
    return (
      <Background>
        <Header className='head'>
          <Logo/><Helper/>
        </Header>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </Background>
    )
  }
}

export default Waiting
