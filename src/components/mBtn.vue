<script setup>
import { computed, ref } from 'vue'

const emits = defineEmits(['click'])
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  as: {
    type: String,
    default: '',
    require: true,
  },
  to: {
    type: Object,
    default: () => {},
  },
  href: {
    type: String,
    default: () => {},
  },
  text: {
    type: String,
    default: '',
  },
  subText: {
    type: String,
    default: '',
  },
  icon: {
    type: Object,
    default: () => {},
  },
  bg: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: null,
  },
  target: {
    type: String,
    default: '',
  },
  setClass: {
    type: Object,
    default: () => {},
  },
  shouldAnim: {
    type: Boolean,
    default: true,
  },
  ga: {
    type: String,
    default: null,
  },
  download: {
    type: String,
    default: null,
  },
})
const is = computed(() => {
  return props.as === 'link' ? 'router-link' : props.as === 'submit' ? 'button' : props.as
})
const event = ref(null)
const bind = computed(() => {
  return props.as === 'link'
    ? {
        to: props.to,
      }
    : props.as === 'a'
      ? {
          href: props.href,
        }
      : {
          type: is.value,
        }
})
const extendClass = computed(() => {
  return {
    ...{
      main: '',
      text: 'txt',
      icon: '',
    },
    ...props.setClass,
  }
})

const clickEvent = async (e) => {
  if (props.disabled) {
    e.preventDefault()
  } else {
    event.value = e
    emits('click', e)
  }
}
</script>

<template>
  <component
    :is="is"
    v-bind="bind"
    class=""
    :class="[extendClass.main]"
    @click="clickEvent($event)"
    :disabled="props.disabled"
    :target="props.as === 'a' && props.target ? props.target : '_self'"
    :rel="props.as === 'a' && !props.download ? 'noopener' : null"
    :gaClick="props.ga"
    :download="props.download"
  >
    <div :class="extendClass.icon" v-if="props.icon">
      <SvgIcon :icon="props.icon.name" :class="props.icon.css" class="" />
    </div>
    <b :class="extendClass.text" v-html="props.text" />
    <b :class="extendClass.subText" v-html="props.subText" v-if="props.subText" />
    <div :class="extendClass.icon" v-if="props.icon">
      <SvgIcon :icon="props.icon.name" :class="props.icon.css" class="" />
    </div>
  </component>
</template>

<style lang="postcss"></style>
