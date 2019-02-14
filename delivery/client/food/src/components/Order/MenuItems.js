import React from 'react'
import MenuItem from './MenuItem'
import styles from './MenuItems.css'

const menuItems = props => {
  const show = props.menu.map(item => {
    return (
      <MenuItem
        key={item.name}
        name={item.name}
        clicked={() => props.clicked(item.name)}
      />
    )
  })

  return <div className={styles.MenuItems}>{show}</div>
}

export default menuItems
