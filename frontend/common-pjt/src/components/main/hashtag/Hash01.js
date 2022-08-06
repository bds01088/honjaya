import React from 'react';
import styled from 'styled-components'

const Hash01block = styled.p`
  font-family: Jua;
  font-size: 1.5rem;
  border-radius: 20%;
  background-color: #85eaea;
  padding: 0.5rem;
`

const Hash01 = ({showRemove01, hash01}) => {
  return (
    <Hash01block onClick={showRemove01}># {hash01}

    </Hash01block>
  )
}

export default Hash01;