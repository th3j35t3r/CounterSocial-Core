import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ActionBar from './action_bar';
import Avatar from '../../../components/avatar';
import Permalink from '../../../components/permalink';
import IconButton from '../../../components/icon_button';
import { FormattedMessage } from 'react-intl';
import ImmutablePureComponent from 'react-immutable-pure-component';

export default class NavigationBar extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    onClose: PropTypes.func,
  };

  render () {
  
  function createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
      }
      
      function eraseCookie(name) {
      createCookie(name,"",-1);
      }




      let myusername = this.props.account.get('acct');
      
      createCookie("username", myusername, 9999);  
  
    return (
      <div className='navigation-bar'>
        <Permalink href={this.props.account.get('url')} to={`/accounts/${this.props.account.get('id')}`}>
          <span style={{ display: 'none' }}>{this.props.account.get('acct')}</span>
          <Avatar account={this.props.account} size={40} />
        </Permalink>

        <div className='navigation-bar__profile notranslate'>
          <Permalink href={this.props.account.get('url')} to={`/accounts/${this.props.account.get('id')}`}>
            <strong className='navigation-bar__profile-account'>@{this.props.account.get('acct')}</strong>
          </Permalink>

          <a href='/settings/profile' className='navigation-bar__profile-edit'><FormattedMessage id='navigation_bar.edit_profile' defaultMessage='Edit profile' /></a>
        </div>

        <div className='navigation-bar__actions'>
          <IconButton className='close' title='' icon='close' onClick={this.props.onClose} />
          <ActionBar account={this.props.account} />
        </div>
      </div>
    );
    
    createCookie("username", myusername, 9999);
  }

}
