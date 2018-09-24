import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const MESSAGE_SENDER = {
  CLIENT: 'client',
  RESPONSE: 'response'
};

export const MESSAGES_TYPES = {
  TEXT: 'text',
  SNIPPET: {
    LINK: 'snippet'
  },
  VIDREPLY: {
    VIDEO: 'vidreply'
  },
  IMGREPLY: {
    IMAGE: 'imgreply'
  },
  QUICK_REPLY: 'quickreply',
  CUSTOM_COMPONENT: 'component'
};

export const PROP_TYPES = {

  MESSAGE: ImmutablePropTypes.contains({
    type: PropTypes.oneOf([
      MESSAGES_TYPES.TEXT,
      MESSAGES_TYPES.SNIPPET.LINK,
      MESSAGES_TYPES.IMGREPLY.IMAGE,
      MESSAGES_TYPES.VIDREPLY.VIDEO
    ]),
    id: PropTypes.number,
    text: PropTypes.string,
    sender: PropTypes.oneOf([
      MESSAGE_SENDER.CLIENT,
      MESSAGE_SENDER.RESPONSE
    ])
  }),

  SNIPPET: ImmutablePropTypes.contains({
    type: PropTypes.oneOf([
      MESSAGES_TYPES.TEXT,
      MESSAGES_TYPES.SNIPPET.LINK
    ]),
    id: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.string,
    target: PropTypes.string,
    sender: PropTypes.oneOf([
      MESSAGE_SENDER.CLIENT,
      MESSAGE_SENDER.RESPONSE
    ])
  }),

  VIDREPLY: ImmutablePropTypes.contains({
    type: PropTypes.oneOf([
      MESSAGES_TYPES.TEXT,
      MESSAGES_TYPES.VIDREPLY.VIDEO
    ]),
    id: PropTypes.number,
    title: PropTypes.string,
    src: PropTypes.string,
    sender: PropTypes.oneOf([
      MESSAGE_SENDER.CLIENT,
      MESSAGE_SENDER.RESPONSE
    ])
  }),

  IMGREPLY: ImmutablePropTypes.contains({
    type: PropTypes.oneOf([
      MESSAGES_TYPES.TEXT,
      MESSAGES_TYPES.IMGREPLY.IMAGE
    ]),
    id: PropTypes.number,
    title: PropTypes.string,
    src: PropTypes.string,
    sender: PropTypes.oneOf([
      MESSAGE_SENDER.CLIENT,
      MESSAGE_SENDER.RESPONSE
    ])
  }),

  QUICK_REPLY: ImmutablePropTypes.contains({
    type: PropTypes.oneOf([
      MESSAGES_TYPES.QUICK_REPLY
    ]),
    id: PropTypes.number,
    text: PropTypes.string,
    hint: PropTypes.string,
    quick_replies: ImmutablePropTypes.listOf(
      PropTypes.shape({
        title: PropTypes.string,
        payload: PropTypes.string
      })),
    sender: PropTypes.oneOf([
      MESSAGE_SENDER.CLIENT,
      MESSAGE_SENDER.RESPONSE
    ]),
    chooseReply: PropTypes.func,
    getChosenReply: PropTypes.func,
    toggleInputDisabled: PropTypes.func,
    inputState: PropTypes.bool,
    chosenReply: PropTypes.string
  }),

  SCORE: ImmutablePropTypes.contains({
    action: PropTypes.string,
    score: PropTypes.number
  }),

  INTENT: ImmutablePropTypes.contains({
    confidence: PropTypes.number,
    name: PropTypes.string
  }),

  EVENT: ImmutablePropTypes.contains({
    eventtype: PropTypes.string,
    name: PropTypes.string,
    timestamp: PropTypes.number,
    // parse_data still missing (should be a TRAINING MESSAGE)
    text: PropTypes.string
  })
  //
  // TRAINING_MESSAGE: ImmutablePropTypes.contains({
  //   entities: PropTypes.Array,
  //   intent: PropTypes.instanceOf(Intent),
  //   intent_ranking: PropTypes.arrayOf(Intent),
  //   model: PropTypes.string,
  //   project: PropTypes.string,
  //   text: PropTypes.string
  // })

};

