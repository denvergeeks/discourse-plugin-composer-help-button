# Discourse Composer Help Button Plugin

A Discourse plugin that adds a helpful **?** button to the composer window, allowing forum administrators to display contextual help content to users while they're writing posts and topics.

## ✨ Features

- **Easy to Use**: Single button in the composer toolbar
- **Customizable Help URL**: Configure any publicly accessible help page
- **Configurable Label**: Customize the button label in settings
- **Modal Display**: Help content displays in a clean modal dialog
- **Responsive Design**: Works on desktop and mobile devices
- **Security**: HTML content is sanitized to prevent XSS attacks
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Theme Compatible**: Works with both light and dark themes

## 📋 Requirements

- Discourse Version: 3.2.0 or later (tested with 2026.01+)
- Ember Version: Ember 5 (only supported version in Discourse 2026)
- Node.js: 18.0 or later (for theme/plugin development)

## 🚀 Installation

### Using Admin Panel (Recommended)

1. Navigate to **Admin → Plugins → Install**
2. Select **From Repository**
3. Enter: `https://github.com/denvergeeks/discourse-plugin-composer-help-button`
4. Click **Install**
5. Click **Enable Plugin**
6. Rebuild the app container

### Manual Installation

1. SSH into your Discourse server
2. Navigate to the plugins directory:

   ```bash
   cd /var/discourse/shared/standalone/plugins



---

# Composer Help Button [OLD]

This plugin adds a help icon to the composer window giving you the ability to show a help document to the user.  

![](https://raw.githubusercontent.com/cpradio/discourse-plugin-composer-help-button/master/screenshot.png)

You can access its settings from the Admin > Plugins page
![](https://raw.githubusercontent.com/cpradio/discourse-plugin-composer-help-button/master/AdminSetting-Plugins.png)

There is also an Admin Setting to identify which topic to use for the content of the modal window.
![](https://raw.githubusercontent.com/cpradio/discourse-plugin-composer-help-button/master/AdminSetting-ComposerHelp.png)

Clicking on the button in the composer window will produce the following modal window to the user
![](https://raw.githubusercontent.com/cpradio/discourse-plugin-composer-help-button/master/ComposerModal.png)

