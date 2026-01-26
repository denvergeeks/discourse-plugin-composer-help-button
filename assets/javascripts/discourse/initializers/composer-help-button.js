import { withPluginApi } from "discourse/lib/plugin-api";
import ComposerHelpModal from "../components/modal/composer-help-modal";

export default {
  name: "composer-help-button",

  initialize(container) {
    const siteSettings = container.lookup("service:site-settings");

    // Only initialize if the feature is enabled
    if (!siteSettings.composer_help_button_enabled) {
      return;
    }

    withPluginApi("0.12.1", (api) => {
      // Register the modal component
      api.registerComponent("modal:composer-help-modal", ComposerHelpModal);

      // Modify the d-editor component to add the help button
      api.modifyClass("component:d-editor", {
        pluginId: "composer-help-button",

        didInsertElement() {
          this._super(...arguments);
          this._registerComposerHelpButton();
        },

        _registerComposerHelpButton() {
          const self = this;
          const modal = this.container.lookup("service:modal");
          const helpUrl = siteSettings.composer_help_button_url;
          const helpLabel =
            siteSettings.composer_help_button_label || "Help";

          // Create the help button action
          const helpAction = {
            id: "help",
            group: 5,
            icon: "question-circle",
            title: helpLabel,
            perform: () => {
              if (!helpUrl) {
                const dialog = self.container.lookup("service:dialog");
                dialog.alert("No help URL configured in admin settings.");
                return;
              }

              self._loadAndShowHelp(helpUrl, modal);
            },
          };

          // Add the button to the toolbar if it doesn't already exist
          if (!this.editorOptions) {
            this.editorOptions = [];
          }

          const buttonExists = this.editorOptions.some(
            (btn) => btn.id === "help"
          );
          if (!buttonExists) {
            this.editorOptions = [...this.editorOptions, helpAction];
          }
        },

        _loadAndShowHelp(url, modal) {
          const self = this;

          // Create a secure fetch request with proper headers
          fetch(url, {
            method: "GET",
            headers: {
              Accept: "text/html",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `HTTP Error: ${response.status} ${response.statusText}`
                );
              }
              return response.text();
            })
            .then((html) => {
              // Show the modal with the fetched content
              modal.show("composer-help-modal", {
                model: {
                  helpContent: html,
                  helpUrl: url,
                },
              });
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error("Composer Help Button: Failed to load help", error);
              const dialog = self.container.lookup("service:dialog");
              dialog.alert(
                `Unable to load help content. Error: ${error.message}`
              );
            });
        },
      });
    });
  },
};
