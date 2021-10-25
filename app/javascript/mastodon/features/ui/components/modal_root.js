import React from 'react';
import PropTypes from 'prop-types';
import Base from '../../../components/modal_root';
import BundleContainer from '../containers/bundle_container';
import BundleModalError from './bundle_modal_error';
import ModalLoading from './modal_loading';
import ActionsModal from './actions_modal';
import MediaModal from './media_modal';
import VideoModal from './video_modal';
import BoostModal from './boost_modal';
import ConfirmationModal from './confirmation_modal';
import FocalPointModal from './focal_point_modal';
import {
  MuteModal,
  ReportModal,
  EmbedModal,
  ListEditor,
  ListAdder,
} from '../../../features/ui/util/async-components';

const MODAL_COMPONENTS = {
  'MEDIA': () => Promise.resolve({ default: MediaModal }),
  'VIDEO': () => Promise.resolve({ default: VideoModal }),
  'BOOST': () => Promise.resolve({ default: BoostModal }),
  'CONFIRM': () => Promise.resolve({ default: ConfirmationModal }),
  'MUTE': MuteModal,
  'REPORT': ReportModal,
  'ACTIONS': () => Promise.resolve({ default: ActionsModal }),
  'EMBED': EmbedModal,
  'LIST_EDITOR': ListEditor,
  'FOCAL_POINT': () => Promise.resolve({ default: FocalPointModal }),
  'LIST_ADDER':ListAdder,
};

export default class ModalRoot extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string,
    props: PropTypes.object,
    onClose: PropTypes.func.isRequired,
  };

  getSnapshotBeforeUpdate () {
    return { visible: !!this.props.type };
  }

  componentDidUpdate (prevProps, prevState, { visible }) {
    if (visible) {
      document.body.classList.add('with-modals--active');
    } else {
      document.body.classList.remove('with-modals--active');
    }
  }

  renderLoading = modalId => () => {
    return ['MEDIA', 'VIDEO', 'BOOST', 'CONFIRM', 'ACTIONS'].indexOf(modalId) === -1 ? <ModalLoading /> : null;
  }

  renderError = (props) => {
    const { onClose } = this.props;

    return <BundleModalError {...props} onClose={onClose} />;
  }

  render () {
    const { type, props, onClose } = this.props;
    const visible = !!type;

    return (
      <Base onClose={onClose}>
        {visible && (
          <BundleContainer fetchComponent={MODAL_COMPONENTS[type]} loading={this.renderLoading(type)} error={this.renderError} renderDelay={200}>
            {(SpecificComponent) => <SpecificComponent {...props} onClose={onClose} />}
          </BundleContainer>
        )}
      </Base>
    );
  }

}
