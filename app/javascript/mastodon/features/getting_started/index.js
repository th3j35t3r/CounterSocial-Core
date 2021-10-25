import React from 'react';
import Column from '../ui/components/column';
import ColumnLink from '../ui/components/column_link';
import ColumnSubheading from '../ui/components/column_subheading';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { me, invitesEnabled, version, profile_directory } from '../../initial_state';
import { fetchFollowRequests } from '../../actions/accounts';
import { List as ImmutableList } from 'immutable';
import { Link } from 'react-router-dom';
import NavigationBar from '../compose/components/navigation_bar';
import Icon from 'mastodon/components/icon';

const messages = defineMessages({
  home_timeline: { id: 'tabs_bar.home', defaultMessage: 'Home' },
  notifications: { id: 'tabs_bar.notifications', defaultMessage: 'Notifications' },
  public_timeline: { id: 'navigation_bar.public_timeline', defaultMessage: 'Federated timeline' },
  settings_subheading: { id: 'column_subheading.settings', defaultMessage: 'Settings' },
  community_timeline: { id: 'navigation_bar.community_timeline', defaultMessage: 'Local timeline' },
  direct: { id: 'navigation_bar.direct', defaultMessage: 'Direct messages' },
  preferences: { id: 'navigation_bar.preferences', defaultMessage: 'Preferences' },
  follow_requests: { id: 'navigation_bar.follow_requests', defaultMessage: 'Follow requests' },
  favourites: { id: 'navigation_bar.favourites', defaultMessage: 'Favourites' },
  blocks: { id: 'navigation_bar.blocks', defaultMessage: 'Blocked users' },
  domain_blocks: { id: 'navigation_bar.domain_blocks', defaultMessage: 'Hidden domains' },
  mutes: { id: 'navigation_bar.mutes', defaultMessage: 'Muted users' },
  pins: { id: 'navigation_bar.pins', defaultMessage: 'Pinned toots' },
  lists: { id: 'navigation_bar.lists', defaultMessage: 'Lists' },
  discover: { id: 'navigation_bar.discover', defaultMessage: 'Discover' },
  personal: { id: 'navigation_bar.personal', defaultMessage: 'Personal' },
  security: { id: 'navigation_bar.security', defaultMessage: 'Security' },
  menu: { id: 'getting_started.heading', defaultMessage: 'Getting started' },
  profile_directory: { id: 'getting_started.directory', defaultMessage: 'Profile directory' },
});

const mapStateToProps = state => ({
  myAccount: state.getIn(['accounts', me]),
  unreadFollowRequests: state.getIn(['user_lists', 'follow_requests', 'items'], ImmutableList()).size,
});

const mapDispatchToProps = dispatch => ({
  fetchFollowRequests: () => dispatch(fetchFollowRequests()),
});

const badgeDisplay = (number, limit) => {
  if (number === 0) {
    return undefined;
  } else if (limit && number >= limit) {
    return `${limit}+`;
  } else {
    return number;
  }
};

export default @connect(mapStateToProps, mapDispatchToProps)
@injectIntl
class GettingStarted extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    myAccount: ImmutablePropTypes.map.isRequired,
    columns: ImmutablePropTypes.list,
    multiColumn: PropTypes.bool,
    fetchFollowRequests: PropTypes.func.isRequired,
    unreadFollowRequests: PropTypes.number,
    unreadNotifications: PropTypes.number,
  };

  componentDidMount () {
    const { myAccount, fetchFollowRequests } = this.props;

    if (myAccount.get('locked')) {
      fetchFollowRequests();
    }
  }

  render () {
    const { intl, myAccount, multiColumn, unreadFollowRequests } = this.props;

    const navItems = [];
    let i = 1;
    let height = (multiColumn) ? 0 : 60;

    if (multiColumn) {
      navItems.push(

        <ColumnLink key={i++} icon='users' text="Community firehose" to='/timelines/public/local' />,
        <ColumnLink key={i++} icon='home' text="My friends" to='/timelines/home' />,
        <ColumnLink key={i++} icon='bell' text="Notifications" to='/notifications' />,
        <ColumnLink key={i++} icon='envelope' text={intl.formatMessage(messages.direct)} to='/timelines/direct' />,
        <ColumnLink icon='video-camera' text="Start a COSOCall" href='https://counter.social/cosocall/initiate.php' to='_blank' />,
        <ColumnLink icon='building' text="COSO Realms" href='https://realms.counter.social' to='_blank' />,
      	<ColumnLink key={i++} icon='group' text="COSO Groups" to='/favourites' />,
      
      	<ColumnLink icon='asterisk' text="COSO Pro" href='https://counter.social/accmgt/getpro.php' to='_blank' />,
      	<ColumnLink icon='sign-out' text="Logout" href='/auth/sign_out' method='delete' />
        
      );

      height += 30 + 41*8;

          }


    if (!multiColumn) {
       navItems.push(
       	<ColumnLink icon='sign-out' text="Logout" href='/auth/sign_out' method='delete' />
      	);

    height += 30 + 41*1;
	}

    if (myAccount.get('locked')) {
      navItems.push(<ColumnLink key={i++} icon='users' text={intl.formatMessage(messages.follow_requests)} badge={badgeDisplay(unreadFollowRequests, 40)} to='/follow_requests' />);
      height += 41;
    }



    return (
      <Column label={intl.formatMessage(messages.menu)}>
        {multiColumn && <div className='column-header__wrapper'>
                  </div>}

        <div className='getting-started'>


    <iframe id='cosoxtalk' class='cosoxtalk' frameborder='0' height='44px' scrolling='no' src='https://counter.social/transdropdown/transdropdown-app.html' width='100%'></iframe>

          <div className='getting-started__wrapper' style={{ height }}>
            {!multiColumn && <NavigationBar account={myAccount} />}
            {navItems}
          </div>

          {!multiColumn && <div className='flex-spacer' />}

          <div className='getting-started__footer' align='center'>

          
          
          <table width="277"  border="0" align="center" bordercolor="#282c37" bgcolor="#282c37">
          <tr>
          <a href="https://counter.social/settings/preferences">Settings</a> ● <Link to='/mutes'><FormattedMessage id='messages.mutes' defaultMessage='Mutes' /></Link> ● <Link to='/blocks'><FormattedMessage id='messages.blocks' defaultMessage='Blocks' /></Link> ● <Link to='/lists'><FormattedMessage id='messages.lists' defaultMessage='Lists' /></Link> ● <a href="https://dashboard.counter.social" target="_blank">Network</a> ● <a href="https://help.counter.social" target="_blank">KB</a> ● <Link to='/keyboard-shortcuts'><FormattedMessage id='navigation_bar.keyboard_shortcuts' defaultMessage='Hotkeys' /></Link> ● <a href="https://counter.social/faqs.html" target="_blank">FAQ</a> ● <a href="https://counter.social/terms.html" target="_blank">ToS</a> ● <a href="https://counter.social/privacy.html" target="_blank">Privacy</a> ● <a href="https://counter.social/license.html" target="_blank">License</a> </tr>
          <tr>
          <div align='right'>
          <iframe frameborder='0' height='1px' scrolling='no' src='https://counter.social/auth/edit' width='1px'></iframe>
          </div>
          </tr>
          </table>

          <div id="desktopnag" class="desktopnag" align="center">
          <hr></hr>
          <img src="https://counter.social/spacer.png" class="finalspacer" id="finalspacer"/>
          For advanced features and full experience please login to the desktop web interface. CounterSocial is also compatible with many <a href="https://counter.social/apps.html" target="_blank">3rd party apps</a>.
          </div>



          <div class="desktoppromo" id ="desktoppromo">

          <div class="desktoppromotitle" id="desktoppromotitle">

      <table width="100%"  border="0">
  
          <tr>
          <td align="right">
          <img src="https://counter.social/spacer.png" class="finalspacer" id="finalspacer"/>
          </td>
          </tr>
          </table>
          DESKTOP WEB FEATURES

          </div>

			<table width="100%"  border="0">
  
    			<tr>
      		<td align="center" width="25%"><img src="https://counter.social/features/1.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/2.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/3.png" width="90%"/></td>
     		<td align="center" width="25%"><img src="https://counter.social/features/4.png" width="90%"/></td>
    		</tr>
    		


			<tr>
      		<td align="center" width="25%"><img src="https://counter.social/features/5.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/6.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/17.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/15.png" width="90%"/></td>
    		</tr>
    		

			<tr>
      		<td align="center" width="25%"><img src="https://counter.social/features/14.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/10.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/11.png" width="90%"/></td>
      		<td align="center" width="25%"><img src="https://counter.social/features/12.png" width="90%"/></td>
    		</tr>
    		


    		

			</table>


			</div>
          

          
          <table width="277" id="killsmallscreen" class="killsmallscreen" border="0" align="center" bordercolor="#282c37" bgcolor="#282c37">
          <tr>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
          <td>
          <div align="center">
          <table width="100%"  border="0" align="center" bordercolor="#282c37" bgcolor="#282c37">
            <tr>
              <td height="66"><div align="center">
                <table width='100%'  border='0'>
                 
                  <tr>
                    <td><div align="left" width="95%">We block 100K+ proxies & these nations (<a href="https://counter.social/faqs.html" target="_blank">why?</a>):</div></td>
                  </tr>
                </table>
              </div>
                <table width='100%'  border='0' align="center">
                  <tr>
                    <td><div align='center'><img src='https://counter.social/CustomStuff/flags/russia.png' title='Russia' alt='Russia' width='33' height='33' /></div></td>
                    <td><div align='center'><img src='https://counter.social/CustomStuff/flags/china.png' title='China' alt='China' width='33' height='33' /></div></td>
                    <td><div align='center'><img src='https://counter.social/CustomStuff/flags/iran.png' title='Iran' alt='Iran' width='33' height='33' /></div></td>
                    <td><div align='center'><img src='https://counter.social/CustomStuff/flags/nk.png' title='North Korea' alt='North Korea' width='33' height='33' /></div></td>
                    <td><div align='center'><img src='https://counter.social/CustomStuff/flags/syria.png' title='Syria' alt='Syria' width='33' height='33' /></div></td>
                    <td><div align='center'><img src='https://counter.social/CustomStuff/flags/pakistan.png' title='Pakistan' alt='Pakistan' width='33' height='33' /></div></td>
                    <td><div align='center'><img src='https://counter.social/CustomStuff/flags/ukraine.png' title='Ukraine' alt='Ukraine' width='33' height='33' /></div></td>
                  </tr>
              </table>
                </td></tr>
          </table> 
          <table width="100%"  border="0" id="killsmallscreen" class="killsmallscreen">
              <tr>
              <td width="50%"><div align="center"><a href="https://counter.social/apps.html" target="_blank"><img src="https://counter.social/CustomStuff/gplay.png" border="0" /></a></div></td>
              <td width="50%"><div align="center"><a href="https://counter.social/apps.html" target="_blank"><img src="https://counter.social/CustomStuff/istore.png" border="0" /></a></div></td>
            </tr>
          </table>
          </div>
          </td>
          </tr> 
          </table>        
                 
          <div align="center" id="killsmallscreen" class="killsmallscreen"><a href="https://counter.social/botsentinel.html" target="_blank"><img src="https://counter.social/botsentinel-tile.png" border="0" /></a></div>
          <div align="center" id="killsmallscreen" class="killsmallscreen"><a href="https://counter.social/factlayer.htm" target="_blank"><img src="https://counter.social/factlayer-tile.png" border="0" /></a></div>
          

          </div>

          <div id='thermometer' class='thermometer'>
    <iframe id="killsmallscreen" class="killsmallscreen" frameborder='0' height='87px' scrolling='no' src='https://counter.social/thermometer/thermometer.php' width='100%'></iframe>
    
    </div>     
          
          <div id='trendcatcher_orig' class='trendcatcher_orig'>
    <iframe id='killsmallscreen' class='killsmallscreen' frameborder='0' height='210px' scrolling='no' src='https://counter.social/trendcatcher/trendingtest.htm' width='100%'></iframe>
    </div>      
          
          
          <div id='cososhare' class='cososhare' width='100%' align='center'>
    <iframe frameborder='0' id='killsmallscreen' class='killsmallscreen' height='90px' scrolling='no' src='https://counter.social/cososhare/cososhare.php' width='100%'></iframe>
    </div>   
          
           <table width="100%"  class="pilogo" id="pilogo" border="0" bgcolor="#191b22" align="center">
          <tr><td>
          <table width="95%"  class="pilogo" id="pilogo" bgcolor="#191b22" border="0" align="center">
    <tr bgcolor="#191b22">
      <td width="98%" bgcolor="#191b22"><div align="left"><a href="https://keybase.io/th3j35t3r" target="_blank"><img src="https://counter.social/CustomStuff/jactual.png" border="0" /></a></div></td>
      <td width="2%" bgcolor="#191b22"><div align="right"><a href="https://console.counter.social" target="_blank"><img src="https://counter.social/CustomStuff/pi.png" border="0" /></a></div></td>
    </tr>
  </table>
  </td></tr></table>  

          
          
        </div>
        
        
        
      </Column>
    );
  }

}
