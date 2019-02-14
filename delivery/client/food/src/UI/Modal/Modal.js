import React from 'react'
import styles from './Modal.css'
import { connect } from 'react-redux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {
  render () {
    return (
      <div>
        <Backdrop clicked={this.props.backDropClicked} show={this.props.show} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          <div> {this.props.messageAfterBuy} </div>
          <button className={styles.button} onClick={this.props.returnToMenu}>
            Return To Menu
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messageAfterBuy: state.firstReducer.messageAfterBuy
  }
}

export default connect(mapStateToProps)(Modal)
