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

      // Use onToolbarCreate to add the button to the composer
      api.onToolbarCreate((toolbar) => {
        const helpUrl = siteSettings.composer_help_button_url;
        const helpLabel = siteSettings.composer_help_button_label || "Help";

        toolbar.addButton({
          id: "help",
          group: 5,
          icon: "question-circle",
          title: helpLabel,
          perform: () => {
            if (!helpUrl) {
              const dialog = container.lookup("service:dialog");
              dialog.alert("No help URL configured in admin settings.");
              return;
            }

            // Load and show help
            const modal = container.lookup("service:modal");
            loadAndShowHelp(helpUrl, modal, container);
          },
        });
      });
    });
  },
};

function loadAndShowHelp(url, modal, container) {
  fetch(url, {
    method: "GET",
    headers: { Accept: "text/html" },
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
      // Basic safety: remove script tags
      const cleanHtml = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );

      modal.show("composer-help-modal", {
        model: {
          helpContent: cleanHtml,
          helpUrl: url,
        },
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Composer Help Button: Failed to load help", error);
      const dialog = container.lookup("service:dialog");
      dialog.alert(
        `Unable to load help content. Error: ${error.message}`
      );
    });
}
