---
outline: deep
---

# Introduction

## Overview

Preset is a system that makes it easy to perform modifications on a **freshly scaffolded project**.

It is distributed as a command line tool, which makes it accessible without installation thanks to [`npx`](https://www.npmjs.com/package/npx). It also has a [programmatic API](/extra-topics/programmatic-api) that is useful for building tools with similar needs.

![](/record.gif)

## Understanding the need

If you are familiar with the concept of **starter projects** or **boilerplates**, this system is an alternative.

### Problem

The main issue with the concept of boilerplate is that, from the user point of view, it is hard to know what changed compared to the initial project.

The features of the boilerplate have to be well-documented, but even then, the users won't know exactly what files have been edited or removed for the boilerplate to work, unless it is also documented — which would be a lot of work.

As a boilerplate maintainer, it can be hard as well to keep track of the changes that have been made to the original codebase. It can be easy to forget something in an update, and dead code can be introduced this way.

Lastly, a project needs to be created from the boilerplate. You can't create a project like you usually do, then consume the boilerplate on top of it.

It also means that if the boilerplate is not actively maintained compared to the project it is built for, it will quickly be out-of-date.

### Solution

A preset, on the other hand, describes the exact changes needed for the features to be added. By reading the preset's code, you know the exact changes it brings.

This solves the previous issue, and makes the maintenance easier, because the overhead caused by all of the files of a boilerplate is gone, and as a preset maintainer, you don't have to maintain every other single file that doesn't change in the preset but need updates because the project on top of which the boilerplate is made was updated.
