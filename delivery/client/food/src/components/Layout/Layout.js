import React from 'react'

import styles from './Layout.css'
import ToolBar from '../../UI/ToolBar/ToolBar'

const Layout = props => (
  <div>
    <ToolBar />
    <main className={styles.Layout}>{props.children}</main>
  </div>
)

export default Layout
