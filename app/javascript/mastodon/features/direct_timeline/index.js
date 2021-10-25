import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Column from '../../components/column';
import ColumnHeader from '../../components/column_header';
import { mountConversations, unmountConversations, expandConversations } from '../../actions/conversations';
import { addColumn, removeColumn, moveColumn } from '../../actions/columns';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connectDirectStream } from '../../actions/streaming';
import ConversationsListContainer from './containers/conversations_list_container';

const messages = defineMessages({
  title: { id: 'column.direct', defaultMessage: 'Direct messages' },
});

export default @connect()
@injectIntl
class DirectTimeline extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    shouldUpdateScroll: PropTypes.func,
    columnId: PropTypes.string,
    intl: PropTypes.object.isRequired,
    hasUnread: PropTypes.bool,
    multiColumn: PropTypes.bool,
  };

  handlePin = () => {
    const { columnId, dispatch } = this.props;

    if (columnId) {
      dispatch(removeColumn(columnId));
    } else {
      dispatch(addColumn('DIRECT', {}));
    }
  }

  handleMove = (dir) => {
    const { columnId, dispatch } = this.props;
    dispatch(moveColumn(columnId, dir));
    //createCookie("dmlock", "true", 9999);
  }

  handleHeaderClick = () => {
    this.column.scrollTop();
    //createCookie("dmlock", "false", 9999);
  }

  //componentDidUpdate() {

 // const { dispatch } = this.props;
 // dispatch(expandConversations());

  //}

  componentDidMount () {
    const { dispatch } = this.props;

    dispatch(mountConversations());
    dispatch(expandConversations());
    this.disconnect = dispatch(connectDirectStream());
  }

  componentWillUnmount () {
    this.props.dispatch(unmountConversations());

    if (this.disconnect) {
      this.disconnect();
      this.disconnect = null;
    }
  }

  setRef = c => {
    this.column = c;

  }

  handleLoadMore = maxId => {
    this.props.dispatch(expandConversations({ maxId }));
   // createCookie("dmlock", "true", 9999);
  }

  render () {
    const { intl, hasUnread, columnId, multiColumn, shouldUpdateScroll } = this.props;
    const pinned = !!columnId;



    const { dispatch } = this.props;

    //var thislastdmid = 0.00;

    

    setInterval(function() {
    
    var updatedms = readCookie("updatedms");

    //console.log("THISLASTDMID: " + thislastdmid);
    //console.log("CURRLASTDMID: " + currlastdmid);

    if (updatedms == "true"){
      
    //thislastdmid = parseFloat(currlastdmid);
    createCookie("updatedms", "false", 9999);
    console.log("DMRAconvoupdatetriggered");
    dispatch(expandConversations());

  //}
  }

  }, 5000);

    return (
      <Column ref={this.setRef} label={intl.formatMessage(messages.title)}>
        <ColumnHeader
          icon='envelope'
          active={hasUnread}
          title={intl.formatMessage(messages.title)}
          onPin={this.handlePin}
          onMove={this.handleMove}
          onClick={this.handleHeaderClick}
          pinned={pinned}
          multiColumn={multiColumn}
        />
        
        <ConversationsListContainer
          trackScroll={!pinned}
          scrollKey={'direct_timeline-${columnId}'}
          timelineId='direct'
          onLoadMore={this.handleLoadMore}
          emptyMessage={<FormattedMessage id='empty_column.direct' defaultMessage="You don't have any direct messages yet. When you send or receive one, it will show up here." />}
          shouldUpdateScroll={shouldUpdateScroll}
        />
        
      </Column>

    );

    




  }

}
