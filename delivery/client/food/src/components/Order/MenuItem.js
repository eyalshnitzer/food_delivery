import React from 'react'

import Tea from '../../Assets/Pics/Tea.jpg'
import Coffee from '../../Assets/Pics/Coffee.jpg'
import Shake from '../../Assets/Pics/Shake.jpg'
import Sandwich from '../../Assets/Pics/Sandwich.jpg'
import Arrow from '../../Assets/Pics/Arrow.png'

import styles from './MenuItem.css'

const menuItem = props => {
  let pic
  switch (props.name) {
    case 'Tea':
      pic = <img className={styles.Pic} src={Tea} alt='arrow' />
      break
    case 'Coffee':
      pic = <img className={styles.Pic} src={Coffee} alt='arrow' />
      break
    case 'Shake':
      pic = <img className={styles.Pic} src={Shake} alt='arrow' />
      break
    case 'Sandwich':
      pic = <img className={styles.Pic} src={Sandwich} alt='arrow' />
      break
    default:
      pic = <img className={styles.Pic} src={Arrow} alt='arrow' />
  }
  return (
    <div className={styles.MenuItem} onClick={props.clicked} id={props.id}>
      {pic}
      <div className={styles.NameDiv}> {props.name} </div>
    </div>
  )
}

export default menuItem
