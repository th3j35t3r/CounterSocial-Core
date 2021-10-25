import React from 'react';
import { Sparklines, SparklinesCurve } from 'react-sparklines';
import { FormattedMessage } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Permalink from './permalink';
import { shortNumberFormat } from '../utils/numbers';

const Hashtag = ({ hashtag }) => (
  <div className='trends__item'>
    <div className='trends__item__name'>
      <Permalink href={hashtag.get('url')} to={`/timelines/tag/${hashtag.get('name')}`}>
        #<span>{hashtag.get('name')}</span>
      </Permalink>

      <FormattedMessage id='trends.count_by_accounts' defaultMessage='{count} {rawCount, plural, one {person} other {people}} talking' values={{ rawCount: hashtag.getIn(['history', 0, 'accounts']), count: <strong>{shortNumberFormat(hashtag.getIn(['history', 0, 'accounts']))}</strong> }} />
    </div>

    <div className='trends__item__current'>
      {shortNumberFormat(hashtag.getIn(['history', 0, 'uses']))}
    </div>

    <div className='trends__item__sparkline'>
      <Sparklines width={50} height={28} data={hashtag.get('history').reverse().map(day => day.get('uses')).toArray()}>
        <SparklinesCurve style={{ fill: 'none' }} />
      </Sparklines>
    </div>
  </div>
);

Hashtag.propTypes = {
  hashtag: ImmutablePropTypes.map.isRequired,
};

export default Hashtag;
