import { connect } from "react-redux";
import { Dialogs } from "./Dialogs";
import { getUsersWithDialogs } from '../../store/reducers/usersMessagesReducer';
import React from "react";


class DialogsAPI extends React.Component {
  componentDidMount() {
    this.props.getUsersWithDialogs();
  }
  render() {
    return (
      <Dialogs {...this.props} />
    )
  }
}

export default connect(
  (state) => ({
    usersID: state.DialogsState.usersWithDialogs //TODO: Надо переместить в DialogsSidebarContainer
  }),
  { getUsersWithDialogs }
)(DialogsAPI)