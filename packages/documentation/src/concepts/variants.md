---
outline: deep
---

# Actions

## Overview

Actions are functions available in preset files. They are a layer of abstraction for diverse kind of manipulations, such as copies, editions, deletions, package installations, and more.

They are the key concept of Preset: easy to use, powerful enough to make almost any kind of preset.

## Usage

Actions are globally avaiable in a preset file. Typings are provided by default if you used `preset init`, so you can benefit from IDE autocompletion. Every action is a single asynchronous function call with a single object parameter. Every object parameter accepts a `title` property that changes the text displayed in the console for the corresponding action when applying the preset.

## Available actions

The following actions are implemented.

| Name                                                | Description                                        |
| --------------------------------------------------- | -------------------------------------------------- |
| [Extract templates](/action/extract-templates)      | Extracts file from the preset's template directory |
| [Install packages](/action/install-packages)        | Installs Node or PHP packages                      |
| [Execute command](/action/execute-command)          | Executes shell commands in the target directory    |
| [Edit files](/action/edit-files)                    | Performs file manipulations on the selected files  |
| [Delete paths](/action/delete-paths)                | Deletes files or directories                       |
| [Apply nested presets](/action/apply-nested-preset) | Applies another preset                             |
| [Group](/action/group)                              | Groups multiple actions together                   |
| [Prompt (experimental)](/action/prompt)             | Asks for user input                                |
