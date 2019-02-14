import React from 'react'
import Button from '../../UI/Button/Button'
import styles from './Main.css'
import Sign from './Sign/Sign'

import { Route } from 'react-router-dom'

class Main extends React.Component {
  signHandler = () => {
    this.props.history.push('/sign')
  }
  render () {
    return (
      <div className={styles.Main}>
        <div className={styles.Title}> Welcome To Food Delivery </div>
        <Button
          clicked={this.signHandler}
          ButtonWidth={'ButtonWidth'}
          btnType={'Ok'}
        >
          Sign In
        </Button>

        <Route path='/sign' component={Sign} />
        {/* <Route path={this.props.history.path + '/sign_up'} component={SignUp} /> */}
      </div>
    )
  }
}

export default Main
