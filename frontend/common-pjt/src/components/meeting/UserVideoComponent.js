import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import './UserVideo.css'
import styled from 'styled-components'

const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
`

const Nickname = styled.div`
  text-align: center;
  position: absolute;
  width: auto;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
`

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    
    // console.log(JSON.parse(this.props.streamManager.stream.connection))
    
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData
    

  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <StreamComponent className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} 
            />
            <Nickname>
              <p>{this.getNicknameTag()}</p>
            </Nickname>
          </StreamComponent>
        ) : null}
      </div>
    )
  }
}
