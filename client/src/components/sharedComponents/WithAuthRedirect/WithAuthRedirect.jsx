import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

export default connect(
  state => ({ isAuth: state.Auth.isAuth })
)(
  ({ to: Component, isAuth, props }) => {
    return (
      !Component ? null : isAuth ?
      < Component {...props} /> :
      < Navigate to={'/login'} />
    )
  }
)


