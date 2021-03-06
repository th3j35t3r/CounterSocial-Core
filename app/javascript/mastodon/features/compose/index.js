import React from 'react';
import ComposeFormContainer from './containers/compose_form_container';
import NavigationContainer from './containers/navigation_container';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { mountCompose, unmountCompose } from '../../actions/compose';
import { Link } from 'react-router-dom';
import { injectIntl, defineMessages } from 'react-intl';
import SearchContainer from './containers/search_container';
import Motion from '../ui/util/optional_motion';
import spring from 'react-motion/lib/spring';
import SearchResultsContainer from './containers/search_results_container';
import { changeComposing } from '../../actions/compose';
import elephantUIPlane from '../../../images/elephant_ui_plane.svg';
import { mascot } from '../../initial_state';
import Icon from 'mastodon/components/icon';

const messages = defineMessages({
  start: { id: 'getting_started.heading', defaultMessage: 'Getting started' },
  home_timeline: { id: 'tabs_bar.home', defaultMessage: 'Home' },
  notifications: { id: 'tabs_bar.notifications', defaultMessage: 'Notifications' },
  public: { id: 'navigation_bar.public_timeline', defaultMessage: 'Federated timeline' },
  community: { id: 'navigation_bar.community_timeline', defaultMessage: 'Local timeline' },
  preferences: { id: 'navigation_bar.preferences', defaultMessage: 'Preferences' },
  logout: { id: 'navigation_bar.logout', defaultMessage: 'Logout' },
  compose: { id: 'navigation_bar.compose', defaultMessage: 'Compose new toot' },
});

const mapStateToProps = (state, ownProps) => ({
  columns: state.getIn(['settings', 'columns']),
  showSearch: ownProps.multiColumn ? state.getIn(['search', 'submitted']) && !state.getIn(['search', 'hidden']) : ownProps.isSearchPage,
});

export default @connect(mapStateToProps)
@injectIntl
class Compose extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    columns: ImmutablePropTypes.list.isRequired,
    multiColumn: PropTypes.bool,
    showSearch: PropTypes.bool,
    isSearchPage: PropTypes.bool,
    intl: PropTypes.object.isRequired,
  };

  componentDidMount () {
    const { isSearchPage } = this.props;

    if (!isSearchPage) {
      this.props.dispatch(mountCompose());
    }
  }

  componentWillUnmount () {
    const { isSearchPage } = this.props;

    if (!isSearchPage) {
      this.props.dispatch(unmountCompose());
    }
  }

  onFocus = () => {
    this.props.dispatch(changeComposing(true));
  }

  onBlur = () => {
    this.props.dispatch(changeComposing(false));
  }
  


  render () {
    const { multiColumn, showSearch, isSearchPage, intl } = this.props;

    let header = '';
    
    
    
    return (
      <div className='drawer' role='region' aria-label={intl.formatMessage(messages.compose)}>
      <div align="center" width="100%" id='hidesmallscreen' class='hidesmallscreen'><iframe id='hidesmallscreen' class='hidesmallscreen' src="https://counter.social/accmgt/banner.php" height="114px" width="285px" frameborder="0" scrolling="no"></iframe></div>
      <div id='moodometer' class='moodometer'>
        <iframe id='killsmallscreen' class='killsmallscreen' frameborder='0' height='100px' scrolling='no' src='https://counter.social/sentcatcher/canvas-gauges-master/examples/coso-sentiment.html' width='100%'></iframe>
      </div>   
        {header}

        {(multiColumn || isSearchPage) && <SearchContainer /> }



        <div className='drawer__pager'>
          {!isSearchPage && <div className='drawer__inner' onFocus={this.onFocus}>
            <NavigationContainer onClose={this.onBlur} />
            <ComposeFormContainer />
            {multiColumn && (
              <div className='drawer__inner__mastodon_voided'>
                
              </div>
            )}
          </div>}

          <Motion defaultStyle={{ x: isSearchPage ? 0 : -100 }} style={{ x: spring(showSearch || isSearchPage ? 0 : -100, { stiffness: 210, damping: 20 }) }}>
            {({ x }) => (
              <div className='drawer__inner darker' style={{ transform: `translateX(${x}%)`, visibility: x === -100 ? 'hidden' : 'visible' }}>
                <SearchResultsContainer />
              </div>
            )}
          </Motion>
        </div>
        
  
         <div id='trendcatcher' class='trendcatcher'>
          <iframe id='killsmallscreen' class='killsmallscreen' frameborder='0' height='175px' scrolling='no' src='https://counter.social/cosotv/home.php' width='100%'></iframe>

  </div>      
        
        
         <div id='cosocombox'>
  <iframe id='killsmallscreen' class='killsmallscreen' frameborder='0' height='69px' scrolling='no' src='https://counter.social/cosocom/cosocom-redux.php' width='100%'></iframe>
  </div>
  
      

  
      </div>
    );
  }

}
