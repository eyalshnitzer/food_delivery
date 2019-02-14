import React from 'react'
import styles from './Button.css'

const button = props => {
  return (
    <button
      link={props.link}
      onClick={props.clicked}
      disabled={props.disabled}
      className={[
        styles.Button,
        styles[props.btnType],
        styles[props.ButtonWidth]
      ].join(' ')}
    >
      {props.children}
    </button>
  )
}

export default button
