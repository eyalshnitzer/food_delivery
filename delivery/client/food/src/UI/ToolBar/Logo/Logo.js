import React from 'react'
import styles from './Logo.css'
import CoffeeLogo from './Coffee.png'

const logo =() => (
    <div className={styles.Coffee}>
        <img src={CoffeeLogo} alt="coffee" />
    </div>
)

export default logo;