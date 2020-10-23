import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100%;
`
export const Info = styled.p`
  font-size: 22px;
  flex-basis: 100%;
  margin: 30px 0;
`
export const Button = styled.button`
  padding: 6px 8px;
`
export const ButtonContainer = styled.div`
  flex-basis: 100%;

  *:nth-child(1) {
    margin-right: 10px;
  }
`
