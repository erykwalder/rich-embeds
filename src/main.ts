import { Plugin } from "obsidian";
import { copyEditorReference } from "./copyReference";
import { quothProcessor } from "./processor";

export default class QuothPlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor(
      "quoth",
      quothProcessor.bind(null, this.app)
    );

    this.addCommand({
      id: "quoth-copy-reference",
      name: "Copy Reference",
      editorCheckCallback: copyEditorReference.bind(null, this.app),
      hotkeys: [
        {
          modifiers: ["Shift", "Mod"],
          key: "'",
        },
      ],
    });
  }
}
