import React from 'react'
import * as actions from '../../../Store/index'
import { connect } from 'react-redux'
import styles from './Welcome.css'
import { Redirect } from 'react-router-dom'

class Welcome extends React.Component {
  state = {
    redirect: false
  }
  componentWillMount = () => {
    this.props.disableRedirect()
  }

  componentDidMount = () => {
    setTimeout(
      function () {
        this.setState({ redirect: true })
      }.bind(this),
      1500
    )
  }
  render () {
    const redirect = this.state.redirect ? <Redirect to='/menu' /> : null
    return (
      <div className={styles.main}>
        <div> {'Welcome ' + this.props.name} </div>
        <div>You Are Redirected to menu...</div>

        {redirect}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.secondReducer.form.first_name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disableRedirect: () => dispatch(actions.disableRedirect())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)
