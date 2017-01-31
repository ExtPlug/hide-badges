import Plugin from 'extplug/Plugin';
import Events from 'plug/core/Events';
import style from './style.css';

const HideBadges = Plugin.extend({
  name: 'Hide Badges',
  description: 'Hides user chat badges.',

  settings: {
    inline: { type: 'boolean', label: 'Inline Chat', default: false }
  },

  style,

  enable() {
    this._super();
    Events.on('chat:afterreceive', this.onMessage, this);
  },

  disable() {
    this._super();
    Events.off('chat:afterreceive', this.onMessage, this);
  },

  onMessage(message, el) {
    if (!this.settings.get('inline')) {
      return;
    }
    if (['message', 'moderation', 'mention', 'emote'].indexOf(message.type) !== -1) {
      el.addClass('inline');
    }
  }
});

export default HideBadges;
