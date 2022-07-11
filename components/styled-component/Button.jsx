import React from 'react'
import styled from 'styled-components';
import Loader from './Loader'

const StyledInput = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
margin-top: 1rem;
height: 38px;
border-radius: 5px;
border: none;
background-color: #0d6efd;
`

const Submit = styled.input`
width: 100%;
height: 100%;
border-radius: 5px;
border: none;
padding: 10px;
background-color: transparent;
cursor: pointer;
&:hover {
    background-color: #1269ec;
}

`

export default function Button({ loader, loading=false ,...restProps }) {
  return (
     <StyledInput>
        {loading ? <Loader/> :  <Submit type="submit" {...restProps}/>}
    </StyledInput>
  )
}
