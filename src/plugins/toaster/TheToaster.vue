<template>
  <div class="toasts">
    <UiToast v-for="{ kind, text, id } in toasts" :kind="kind" :text="text" :key="id" @close="update()" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { nanoid } from 'nanoid';
import UiToast, { type TToastKind, ToastKind } from './UiToast.vue';

type TToast = { kind: TToastKind; text: string; id: string };

const toasts = ref<TToast[]>([]);

const success = (text: string) => {
  toasts.value.push({ id: nanoid(5), kind: ToastKind.SUCCESS, text });
};

const error = (text: string) => {
  toasts.value.push({ id: nanoid(5), kind: ToastKind.ERROR, text });
};

const update = () => {
  toasts.value.splice(0, 1);
};

defineExpose({ success, error });
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
