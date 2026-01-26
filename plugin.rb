# name: composer-help-button
# about: Adds a help button to the composer to display contextual help content
# version: 1.0.0
# authors: Denver Geeks
# url: https://github.com/denvergeeks/discourse-plugin-composer-help-button
# required_version: 3.2.0
# compatibility_version: 2026.01

enabled_site_setting :composer_help_button_enabled

after_initialize do
  # Register the composer help button initializer
  PLUGIN_NAME ||= "discourse-plugin-composer-help-button"
end
