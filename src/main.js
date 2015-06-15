define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');
  const Events = require('plug/core/Events');

  const HideBadges = Plugin.extend({
    name: 'Hide Badges',
    description: 'Hides user chat badges.',

    settings: {
      inline: { type: 'boolean', label: 'Inline Chat', default: false }
    },

    enable() {
      this._super();
      this.Style({
        '#chat': {
          '.msg': { padding: '5px 8px 6px 8px' },
          '.badge-box': { display: 'none' }
        }
      });
      Events.on('chat:afterreceive', this.onMessage, this);
    },

    disable() {
      this._super();
      Events.off('chat:afterreceive', this.onMessage, this);
    },

    onMessage(message, el) {
      if (!this.settings.get('inline')) return;
      if ([ 'message', 'moderation', 'mention', 'emote' ].indexOf(message.type) !== -1) {
        el.addClass('inline');
      }
    }

  });

  module.exports = HideBadges;

});
