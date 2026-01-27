import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import { i18n } from "discourse/lib/i18n";

export default class ComposerHelpModal extends Component {
  @tracked helpContent = "";

  constructor() {
    super(...arguments);
    this.helpContent = this.args.model?.helpContent || "";
  }

  @action
  closeModal() {
    this.args.closeModal?.();
  }

  get hasContent() {
    return this.helpContent && this.helpContent.trim().length > 0;
  }

  <template>
    <DModal
      @title="Composer Help"
      @onClose={{this.closeModal}}
      class="composer-help-modal"
    >
      <:body>
        <div class="help-content">
          {{#if this.hasContent}}
            <div class="help-text">
              {{{this.helpContent}}}
            </div>
          {{else}}
            <p class="no-help-content">No help content available.</p>
          {{/if}}
        </div>
      </:body>

      <:footer>
        <DButton
          @action={{this.closeModal}}
          @label="Close"
          @isDisabled={{false}}
          @class="btn-primary"
        />
      </:footer>
    </DModal>
  </template>
}
