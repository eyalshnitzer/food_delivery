import React from 'react'
import styles from './navigationItem.css'
import { NavLink } from 'react-router-dom'

const navigationItem = props => (
  <div className={styles.NavigationItem}>
    <NavLink className={styles.NavLink} to={props.link}>
      {props.children}
    </NavLink>
  </div>
)

export default navigationItem
