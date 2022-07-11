import React from 'react'
import styled from 'styled-components';

const StyledContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
border-radius: 5px;
border: none;
background-color: ${props => props.error ? '#f8d7da' : props.message  && '#d1e7dd'};
border-color: ${props => props.error ? '#f5c2c7' : props.message && '#badbcc'};
color: ${props => props.error ? '#84203A' : props.message &&'#0f5132'};
overflow: hidden;
padding: 10px
`

export default function Alert({  ...restProps }) {
  return (
    <StyledContainer {...restProps}>
        {restProps.error} {restProps.message}
    </StyledContainer>
  )
}
