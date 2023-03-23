import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { submitUserData } from "../../store/reducers/authReducer";
import { compose } from "redux";
import { SignIn } from "./SignIn";


function AuthAPI(props) {
  const navigate = useNavigate();
  const isAuth = props.isAuth
  useEffect(() => {
    // Если мы залогинены, то происходит автоматический редирект на страницу "/"
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  return (
    <SignIn
      submitUserData={props.submitUserData}
    />
  );
}


export default compose(
  connect(
    (state) => ({
      isAuth: state.Auth.isAuth,
    }),
    { submitUserData }),
)(AuthAPI);