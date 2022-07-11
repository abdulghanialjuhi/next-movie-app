import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
width: 100%;
margin-bottom: 1rem;
height: 38px;
border-radius: 5px;
padding: 10px;
border: none;
color: black;
`

export default function Input({ valueRef, ...restProps }) {

  return  <StyledInput ref={valueRef} {...restProps} />
}
