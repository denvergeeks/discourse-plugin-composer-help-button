# name: discourse-plugin-composer-help-button
# about: Adds a help button to the composer to display contextual help content
# version: 1.0.0
# authors: Denver Geeks
# url: https://github.com/denvergeeks/discourse-plugin-composer-help-button
# required_version: 3.2.0
# compatibility_version: 2026.01

enabled_site_setting :composer_help_button_enabled

register_asset "stylesheets/composer-help-button.scss"

module ::DiscoursePluginComposerHelpButton
  PLUGIN_NAME = "discourse-plugin-composer-help-button"
end

after_initialize do

end
