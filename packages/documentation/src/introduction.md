---
outline: deep
---

# Introduction

## Why i should use this?

- You want a small set of Tailwind, Boostrap or w/e components ready to go for Vue 3
- You want to use utility classes or classes to style your component, no matter what CSS framework
- You want to recycle your components between projects with very little effort
- You want to create different variants of your components in a clean way
- You want to quickly bootstrap a project and test stuff out without pushing a huge UI framework
- Your lazy as i am 🦥
- You are tired of styling things over and over again
- You are a cool person, and you want to give Vanilla Components a spin! 🥳

👉 But hey, if you are not a ready jump right to the Components section!

## Motivation & Story

Vanilla Components was created with the need of re-using components for my own projects & client work, everytime i started a new project i would need  to copy & configure components from previous components, style them over again! After all that, we have found a bug on one of the components? Guess what, lets go back and fix everything! What boring process!

After searching a couple of days for a nice component library i couldn't find myself one that worked perfectly with Tailwind CSS, Vuetify is still material and was really late for a Vue 3 Release, others were too much opinated, etc... long story short that's when i found [Vue Tailwind](https://vue-tailwind.com) and instantly felt in love ❤️ with it, sponsoring the creator with the funds i had on my hands, and trying to support the project as much as i can, but Vue Tailwind was also late for a Vue 3 release that turned to be later on [VariantJS](https://github.com/variantjs/vue) that was recently partially abandoned.

That being said, i have decided to take a spin on my own library, taking the concept of VariantJS and using its core concept to Vanilla Components with my own touch!

## How "Vanilla" is this?

As much as we can, we avoid pulling 3rd party packages, but for what it matters we only include battle tested libraries such as **[HeadlessUI](https://headlessui.com)** to wrap a few components and take advantage of all the accessibility & nice work already done, there is no point on re-inventing the wheel for those cases, lets just style them and take advantage of our Theme & Variations system to achieve what we need.

## What we are doing next?

Well, the main goals would be improving the current components, add tests, add a few more interesting components, but keep in mind we wanted to keep this library as **small as possible** with the "basics", this would make sure that it will be still maintainable at least for myself, while still providing a nice value for further projects.
