import React from 'react'
import styles from './ItemDetails.css'

class ItemDetails extends React.Component {
  render () {
    return (
      <div className={styles.main}>
        {Object.keys(this.props.itemDetails).map(item => {
          return <div> {item + ' : ' + this.props.itemDetails[item]} </div>
        })}
      </div>
    )
  }
}

export default ItemDetails
