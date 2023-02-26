import React from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

import { getUserDialog, getMyProfile, getCompanionProfile } from '../../../../store/reducers/usersMessagesReducer';

import DialogsMessagesList from "../DialogsMessagesList/DialogsMessagesList";
import Preloader from "../../../sharedComponents/Preloader/Preloader";
import { DIALOGS } from "../../../../store/reducers/fetchingReducer";

const DialogsMessagesListAPI = (props) => {
  const { userID } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!userID) return;
    props.getUserDialog(userID)
    props.getMyProfile();
    props.getCompanionProfile(userID);
  }, [pathname])
  return (
    props.isFetching ?
      <Preloader /> :
      < DialogsMessagesList
        curUserMessages={props.curUserMessages}
        myProfile={props.myProfile}
        companionProfile={props.companionProfile}
      />
  )
}

export const DialogsMessagesListContainer = connect(
  (state) => ({
    curUserMessages: state.DialogsState.usersMessages,
    isFetching: state.FetchingState[DIALOGS],
    myProfile: state.DialogsState.myProfile,
    companionProfile: state.DialogsState.companionProfile,
  }), {
  getUserDialog,
  getMyProfile,
  getCompanionProfile
})(DialogsMessagesListAPI);
