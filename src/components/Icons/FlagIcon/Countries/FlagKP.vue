<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 72 36"
  ><rect
    fill="#024FA2"
    width="72"
    height="36"
  /><rect
    fill="#fff"
    y="6"
    width="72"
    height="24"
  /><rect
    fill="#ED1C27"
    y="7"
    width="72"
    height="22"
  /><circle
    fill="#fff"
    cx="24"
    cy="18"
    r="8"
  /><g
    id="star"
    transform="translate(24,18) scale(7.75)"
    fill="#ED1C27"
  ><g id="cone"><polygon
    id="triangle"
    points="0,0 0,1 .5,1"
    transform="translate(0,-1) rotate(18)"
  /><use
    id="use12"
    xlink:href="#triangle"
    transform="scale(-1,1)"
  /></g><use
    id="use14"
    xlink:href="#cone"
    transform="rotate(72)"
  /><use
    id="use16"
    xlink:href="#cone"
    transform="rotate(-72)"
  /><use
    id="use18"
    xlink:href="#cone"
    transform="rotate(144)"
  /><use
    id="use20"
    xlink:href="#cone"
    transform="rotate(-144)"
  /></g></svg>
</template>