import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { FormattedMessage, injectIntl } from 'react-intl';
import api from '../../../api';

export default @injectIntl
class EmbedModal extends ImmutablePureComponent {

  static propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
    oembed: null,
  };

  componentDidMount () {
    const { url } = this.props;

    this.setState({ loading: true });

    api().post('/api/web/embed', { url }).then(res => {
      this.setState({ loading: false, oembed: res.data });

      const iframeDocument = this.iframe.contentWindow.document;

      iframeDocument.open();
      iframeDocument.write(res.data.html);
      iframeDocument.close();

      iframeDocument.body.style.margin = 0;
      this.iframe.width  = iframeDocument.body.scrollWidth;
      this.iframe.height = iframeDocument.body.scrollHeight;

      document.getElementById('privmodal').style.width = '500px';
      var thing = 'https://counter.social/enhancedprivacy/frame.php';
      document.getElementById('tootframe').src = thing;

    }).catch(error => {
      this.props.onError(error);
    });
  }

  setIframeRef = c =>  {
    this.iframe = c;
  }

  handleTextareaClick = (e) => {
    e.target.select();
  }

  render () {
    const { oembed } = this.state;

    return (
      <div className='modal-root__modal embed-modal' id='privmodal'>
        <h4>Enhanced Privacy Mode</h4>

        
          <iframe
            id ='tootframe'
            scrolling='no'
            src = ''
            className='embed-modal__iframe'
            frameBorder='0'
            ref={this.setIframeRef}
            title='preview'
          />
        
      </div>
    );
  }

}
