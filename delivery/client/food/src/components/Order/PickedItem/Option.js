import React from 'react'
import styles from './Option.css'
import { connect } from 'react-redux'
import * as actions from '../../../Store/index'

class Option extends React.Component {
  state = {
    chosenWayInside: '',
    chosenSize: '',
    priceToAdd: 0,
    ItemDetails: []
  }
  HandleChosenWay = (way, id) => {
    this.setState({ chosenWayInside: way })
    this.props.updateWayOfServe(way, id)
  }

  componentDidMount = () => {
    this.setState({ chosenWayInside: '' })
    this.props.initiateChosenDetails()
  }

  render () {
    return (
      <div className={styles.Option}>
        <div> {this.props.id} </div>
        <div>
          {this.props.arr.map(way => {
            return (
              <button
                key={way}
                onClick={() => this.HandleChosenWay(way, this.props.id)}
                // onClick={() => this.props.updateWayOfServe(way, this.props.id)}
                className={
                  this.state.chosenWayInside === way
                    ? styles.Chosen
                    : styles.notChosen
                }
              >
                {way}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cs: state.reducerchosenWay,
    bid: state.firstReducer.boughtItemDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateWayOfServe: (way, id) => dispatch(actions.updateWayOfServe(way, id)),
    initiateChosenDetails: () => dispatch(actions.initiateChosenDetails())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Option)
