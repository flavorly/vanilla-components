---
outline: deep
---

# Alternatives

## About scaffolding tools

Preset isn't the first tool scaffolding tool to see the day.

Alternatives are available, each having their pros and cons. But Preset is the first one to actually focus on **modifying existing projects**. The projects listed below are scaffolding tools that you may want to know about.

## Well-known alternatives

### SAO

[SAO](https://github.com/saojs/sao) inspired the first version of Preset quite a bit. It looked similar on paper, but there is a fundamental difference: SAO was made for scaffolding, while Preset is meant for editing already scaffolded projects — even though it can do both.

While SAO is useful, it doesn't answer the same needs. It is closer to [Yeoman](http://yeoman.io/).

### Yeoman

[Yeoman](http://yeoman.io/) is another scaffolding tool with a great and mature ecosystem. Though, just like to SAO, it does not answer to the same needs.

The main con with Yeoman is that it is quite complex to dive into. Additionally, generators need to be manually installed — Yeoman does not do it for you.

### Plop

[Plop](https://github.com/plopjs/plop) is a generator that is meant to be installed as a project dependency. Plop looks for a configuration file in the project and generates files accordingly when you invoke it.

That means Preset could actually be used to setup Plop on a project.
