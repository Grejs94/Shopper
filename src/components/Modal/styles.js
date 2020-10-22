import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

export const Content = styled.div`
  background-color: #fff;
  position: absolute;
  margin: auto;
  width: 300px;
  height: 300px;
  padding: 20px;
  text-align: center;
`

export const CloseIcon = styled.div`
  position: absolute;
  right: 7px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;
`

export const ChildrenContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100%;
`
export const ChildrenInfo = styled.p`
  font-size: 22px;
  flex-basis: 100%;
  margin: 30px 0;
`
