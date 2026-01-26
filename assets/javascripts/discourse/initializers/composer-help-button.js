import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "composer-help-button",

  initialize(container) {
    const siteSettings = container.lookup("service:site-settings");

    if (!siteSettings.composer_help_button_enabled) {
      return;
    }

    withPluginApi("0.12.1", (api) => {
      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "composer-help-button",
          group: "insertions",
          icon: "question-circle",
          title: siteSettings.composer_help_button_label || "Help",

          perform() {
            const helpUrl = siteSettings.composer_help_button_url;
            if (!helpUrl) {
              const dialog = container.lookup("service:dialog");
              dialog.alert(
                "No help URL configured in the Composer Help Button settings."
              );
              return;
            }

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
