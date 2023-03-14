<script setup lang="ts">
import { Button, Slideover } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const openRight = ref(false)
const openLeft = ref(false)
const openTop = ref(false)
const openBottom = ref(false)
</script>

<template>
  <PreviewWrapper>
    <div class="flex flex-col items-center justify-center mx-auto space-y-3 ">
      <Button
        label="Open from Right"
        @click="openRight = !openRight"
      />

      <Button
        label="Open from Left"
        @click="openLeft = !openLeft"
      />
      <Button
        label="Open from Top"
        @click="openTop = !openTop"
      />

      <Button
        label="Open from Bottom"
        @click="openBottom = !openBottom"
      />
    </div>

    <Slideover
      v-model="openLeft"
      :teleport="false"
      position="left"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div class="space-y-6 pb-16">
        <div>
          <div class="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80"
              alt=""
              class="object-cover"
            >
          </div>
          <div class="mt-4 flex items-start justify-between">
            <div>
              <h2 class="text-base font-semibold leading-6 text-gray-900">
                <span class="sr-only">Details for </span>IMG_4985.HEIC
              </h2>
              <p class="text-sm font-medium text-gray-500">
                3.9 MB
              </p>
            </div>
            <Button
              type="button"
              class="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span class="sr-only">Favorite</span>
            </Button>
          </div>
        </div>
        <div>
          <h3 class="font-medium text-gray-900">
            Information
          </h3>
          <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
            <div class="flex justify-between py-3 text-sm font-medium">
              <dt class="text-gray-500">
                Uploaded by
              </dt>
              <dd class="text-gray-900">
                Marie Culver
              </dd>
            </div>
            <div class="flex justify-between py-3 text-sm font-medium">
              <dt class="text-gray-500">
                Created
              </dt>
              <dd class="text-gray-900">
                June 8, 2020
              </dd>
            </div>
            <div class="flex justify-between py-3 text-sm font-medium">
              <dt class="text-gray-500">
                Last modified
              </dt>
              <dd class="text-gray-900">
                June 8, 2020
              </dd>
            </div>
            <div class="flex justify-between py-3 text-sm font-medium">
              <dt class="text-gray-500">
                Dimensions
              </dt>
              <dd class="text-gray-900">
                4032 x 3024
              </dd>
            </div>
            <div class="flex justify-between py-3 text-sm font-medium">
              <dt class="text-gray-500">
                Resolution
              </dt>
              <dd class="text-gray-900">
                72 x 72
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h3 class="font-medium text-gray-900">
            Description
          </h3>
          <div class="mt-2 flex items-center justify-between">
            <p class="text-sm italic text-gray-500">
              Add a description to this image.
            </p>
            <Button
              type="button"
              class="-mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              <span class="sr-only">Add description</span>
            </Button>
          </div>
        </div>
        <div>
          <h3 class="font-medium text-gray-900">
            Shared with
          </h3>
          <ul
            role="list"
            class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200"
          >
            <li class="flex items-center justify-between py-3">
              <div class="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=1024&amp;h=1024&amp;q=80"
                  alt=""
                  class="h-8 w-8 rounded-full"
                >
                <p class="ml-4 text-sm font-medium text-gray-900">
                  Aimee Douglas
                </p>
              </div>
              <Button
                type="button"
                class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Remove<span class="sr-only"> Aimee Douglas</span>
              </Button>
            </li>
            <li class="flex items-center justify-between py-3">
              <div class="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixqx=oilqXxSqey&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                  class="h-8 w-8 rounded-full"
                >
                <p class="ml-4 text-sm font-medium text-gray-900">
                  Andrea McMillan
                </p>
              </div>
              <Button
                type="button"
                class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Remove<span class="sr-only"> Andrea McMillan</span>
              </Button>
            </li>
            <li class="flex items-center justify-between py-2">
              <Button
                type="button"
                class="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </span>
                <span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Share</span>
              </Button>
            </li>
          </ul>
        </div>
        <div class="flex">
          <Button
            type="button"
            class="flex-1 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Download
          </Button>
          <Button
            type="button"
            class="ml-3 flex-1 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Delete
          </Button>
        </div>
      </div>
    </Slideover>

    <Slideover
      v-model="openRight"
      :teleport="false"
      position="right"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div class="absolute inset-0 px-4 sm:px-6">
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
        />
      </div>
    </Slideover>

    <Slideover
      v-model="openTop"
      position="top"
      size="full"
      :teleport="false"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div>
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
        >
          Im a content here
        </div>
      </div>
    </Slideover>

    <Slideover
      v-model="openBottom"
      position="bottom"
      size="full"
      :teleport="false"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div>
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
        >
          Im a content here
        </div>
      </div>
    </Slideover>
  </PreviewWrapper>
</template>
