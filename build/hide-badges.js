

define('extplug/hide-badges/main',['require','exports','module','extplug/Plugin','plug/core/Events'],function (require, exports, module) {

  var Plugin = require('extplug/Plugin');
  var Events = require('plug/core/Events');

  var HideBadges = Plugin.extend({
    name: 'Hide Badges',
    description: 'Hides user chat badges.',

    settings: {
      inline: { type: 'boolean', label: 'Inline Chat', 'default': false }
    },

    style: {
      '#chat': {
        '.msg': {
          'padding': '5px 8px 6px 8px'
        },
        '.badge-box': {
          // can't just display:none, because the user rollover positions itself
          // relative to the badge box
          'visibility': 'hidden',
          'width': 0,
          'margin-left': 0
        },
        '.cm.inline .badge-box': {
          'margin-left': 0,
          'margin-right': 0
        }
      }
    },

    enable: function enable() {
      this._super();
      Events.on('chat:afterreceive', this.onMessage, this);
    },

    disable: function disable() {
      this._super();
      Events.off('chat:afterreceive', this.onMessage, this);
    },

    onMessage: function onMessage(message, el) {
      if (!this.settings.get('inline')) return;
      if (['message', 'moderation', 'mention', 'emote'].indexOf(message.type) !== -1) {
        el.addClass('inline');
      }
    }

  });

  module.exports = HideBadges;
});
