import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthUserdata } from './../../redux/authReducer'

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getAuthUserdata();
  }
  render() {
    return <Header {...this.props} />

  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login

})
export default connect(mapStateToProps, { getAuthUserdata })(HeaderContainer);