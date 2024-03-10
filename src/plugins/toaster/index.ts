import { createApp, inject, type ComponentPublicInstance, type App } from 'vue';
import TheToaster from './TheToaster.vue';

export type TToaster = { success: (text: string) => void; error: (text: string) => void };
export const TOASTER_KEY = Symbol('TOASTER_KEY');
export function useToaster(): TToaster {
  const toaster = inject<TToaster>(TOASTER_KEY);
  if (!toaster) {
    throw new Error('Toaster has not installed yet');
  }

  return toaster;
}

export function createToaster({ container }: { container?: HTMLElement } = {}) {
  const toasterInstance: ComponentPublicInstance<typeof TheToaster> = createApp(TheToaster).mount(
    container || document.body.appendChild(document.createElement('div')),
  ) as ComponentPublicInstance<typeof TheToaster>;

  const toaster = {
    success: toasterInstance.success,
    error: toasterInstance.error,

    /** @implements {import('@vue/runtime-core').PluginInstallFunction} */
    install(app: App) {
      app.provide(TOASTER_KEY, toaster);
    },
  };

  return toaster;
}
