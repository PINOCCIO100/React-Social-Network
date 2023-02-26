import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { submitUserData } from "../../store/reducers/authReducer";
import Auth from "./Auth";
import { compose } from "redux";


function AuthAPI(props) {
  const navigate = useNavigate();
  useEffect(() => {
    // Если мы залогинены, то происходит автоматический редирект на страницу "/"
    if (props.isAuth) navigate('/');
  }, [props.isAuth]);

  return (
    <Auth
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