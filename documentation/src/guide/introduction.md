---
outline: deep
---

# Introduction

## Why I should use this?

- I want a small set of Tailwind, Boostrap, or w/e components ready to go for Vue 3
- I want to use utility classes or classes to style your component, no matter what CSS framework
- I want to recycle components between projects with very little effort
- I want to create different variants of your components in a clean & organized way
- I want to quickly bootstrap a project and test stuff out without pushing a huge UI framework
- I'm lazier than you 🦥
- I am tired of styling things over and over again
- I am a cool person, and you want to give Vanilla Components a spin! 🥳
- I am tired of waiting for someone else to update their huge UI Library

👉 But hey, if you are not ready jump right to the Components section!

## Motivation & Story

Vanilla Components was created with the need to re-use components for my own projects & client work, everytime I started a new project I would need to copy & configure components from previous components, and style them over again! After all that, we found a bug in one of the components. Guess what, let's go back and fix everything! What a boring process!

After searching for a couple of days for a nice component library I couldn't find one that worked perfectly with Tailwind CSS, Vuetify is still material and was really late for a Vue 3 Release, others were too much opinated, etc... long story short that's when I found [Vue Tailwind](https://vue-tailwind.com) and instantly fell in love ❤️ with it, sponsoring the creator with the funds I had on my hands, and trying to support the project as much as I can, but Vue Tailwind was also late for a Vue 3 release that turned to be later on [VariantJS](https://github.com/variantjs/vue) that was recently partially abandoned.

That being said, I have decided to take a spin on my own library, taking the concept of VariantJS and using its core concept to Vanilla Components with my own touch!

## Why vanilla?

The whole idea is to not "depend" on some package to continue your life or start your next project, so I try to keep the components as plain as possible so whenever a new version of Vue is released, we would be able to quickly shift and get it working in no time.

You may ask yourself, yeah but then why its HeadlessUI and all other packages there as peer dependency? That's right a good question! At the end of the day, we still depend on some 3rd party libraries because at the time being they provide a really great value, but the good thing is we have created a wrapper around there, so if for example, HeadlessUI would stop being maintained, we could quickly swap their components for something else, while still keeping the same "API". The same applies to other components, the reason why we called it Vanilla :) because it's vanilla as possible!

## The core concept

The concept is pretty simple, less work doing small components while still benefiting from the whole styling flexibility.

## Why not functional components?

Well, I don't have enough time to write function components yet, nor enough knowledge yet to do them the right way.
If you are a fan of those please check **[HeadlessUI](https://headlessui.com)**.

Plus the whole point of this project is to cut the boring work, we would still have to style functional components over and over every single project. :p

## Roadmap

Well, the main goal would be improving the current components, adding tests, add a few more interesting components, but keep in mind we wanted to keep this library as **small as possible** with the "basics", this would make sure that it will be still maintainable at least for myself, while still providing a nice value for further projects.
