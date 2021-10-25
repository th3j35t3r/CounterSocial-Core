import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import StatusContainer from '../../../containers/status_container';

export default class Conversation extends ImmutablePureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    conversationId: PropTypes.string.isRequired,
    accounts: ImmutablePropTypes.list.isRequired,
    lastStatusId: PropTypes.string,
    unread:PropTypes.bool.isRequired,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    markRead: PropTypes.func.isRequired,
  };

  handleClick = () => {
    if (!this.context.router) {
      return;
    }

    const { lastStatusId, unread, markRead } = this.props;

    if (unread) {
      markRead();
    }

    this.context.router.history.push(`/statuses/${lastStatusId}`);
  }

  handleHotkeyMoveUp = () => {
    this.props.onMoveUp(this.props.conversationId);
    //createCookie("dmlock", "false", 9999);
  }

  handleHotkeyMoveDown = () => {
    this.props.onMoveDown(this.props.conversationId);
    //createCookie("dmlock", "true", 9999);
  }

  render () {
    const { accounts, lastStatusId, unread } = this.props;
    
    
    var lastdmid = parseFloat(readCookie("lastdmid"));

    //if (lastStatusId !== null) {
    
    if (lastdmid == null){
      createCookie("lastdmid", "0.00", 9999);
    }

    if (lastdmid == ""){
      createCookie("lastdmid", "0.00", 9999);
    }

    var lastdmid = parseFloat(readCookie("lastdmid"));

    if (parseFloat(lastStatusId) > parseFloat(lastdmid)){
    //var rndInt = Math.floor(Math.random() * 9999) + 1
    console.log("LASTSTATUSID: " + lastStatusId);
    console.log("LASTDMIDCOOKIE: " + lastdmid);

    createCookie("updatedms", "true", 9999);

    createCookie("lastdmid", lastStatusId, 9999);
    } else {

    createCookie("updatedms", "false", 9999);

    }



  //}

    if (lastStatusId === null) {
      return null;
    }

    return (
      <StatusContainer
        id={lastStatusId}
        unread={unread}
        otherAccounts={accounts}
        onMoveUp={this.handleHotkeyMoveUp}
        onMoveDown={this.handleHotkeyMoveDown}
        onClick={this.handleClick}
      />
    );

     
  }

}
