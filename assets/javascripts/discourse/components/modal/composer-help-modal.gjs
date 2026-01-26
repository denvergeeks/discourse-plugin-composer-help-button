import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import sanitizeHtml from "discourse/lib/sanitize-html";

export default class ComposerHelpModal extends Component {
  @tracked sanitizedContent = "";

  constructor() {
    super(...arguments);

    const content = this.args.model?.helpContent || "";
    // Sanitize HTML to prevent XSS attacks
    this.sanitizedContent = sanitizeHtml(content, {
      allowedTags: [
        "b",
        "i",
        "em",
        "strong",
        "a",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "pre",
        "code",
        "blockquote",
        "hr",
        "table",
        "tr",
        "td",
        "th",
        "thead",
        "tbody",
      ],
      allowedAttributes: {
        a: ["href", "title", "target", "rel"],
        img: ["src", "alt", "title"],
        code: ["class"],
        pre: ["class"],
      },
    });
  }

  @action
  closeModal() {
    this.args.closeModal?.();
  }

  get hasContent() {
    return this.sanitizedContent && this.sanitizedContent.trim().length > 0;
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
              {{! Safe because we sanitized it in the constructor }}
              {{{this.sanitizedContent}}}
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
          @class="btn-primary"
        />
      </:footer>
    </DModal>
  </template>
}
