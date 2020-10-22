import React from 'react'

import * as Styles from './styles'

const ScrollTop = ({ value }) => {
  const checkpoint = value
  let opacity = 0
  let display = 'none'

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset
    if (currentScroll <= checkpoint) {
      display = 'none'
      opacity = 0
    } else {
      display = 'flex'
      opacity = currentScroll * 0.0008
    }
    document.querySelector('#scroll').style.opacity = opacity
    document.querySelector('#scroll').style.display = display
  })

  return (
    <Styles.SymbolContainer id="scroll">
      <Styles.TurnedSymbol
        onClick={() =>
          document.body.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })
        }
      >
        &laquo;
      </Styles.TurnedSymbol>
    </Styles.SymbolContainer>
  )
}

export default ScrollTop
