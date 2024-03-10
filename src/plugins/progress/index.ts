import { createApp, inject, type App, type ComponentPublicInstance, type Plugin } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';
import type { Router } from 'vue-router';

export type TProgress = {
  start: (loader: string) => void;
  finish: (loader?: string | undefined) => void;
  fail: () => void;
} & Plugin;

export const PROGRESS_KEY = Symbol('PROGRESS_KEY');
export function useProgress(): TProgress {
  const progress = inject<TProgress>(PROGRESS_KEY);
  if (!progress) {
    throw new Error('Progress plugin has not installed yet');
  }

  return progress;
}

export function createProgress({ container, router }: { container?: HTMLElement; router?: Router } = {}) {
  const progressInstance = createApp(TheTopProgressBar).mount(
    container || document.body.appendChild(document.createElement('div')),
  ) as ComponentPublicInstance<typeof TheTopProgressBar>;

  if (router) {
    router.beforeEach((to) => {
      progressInstance.start(to.path);
    });
    router.afterEach((to) => {
      progressInstance.finish(to.path);
    });

    router.onError(() => progressInstance.fail());
  }

  const progress: TProgress = {
    start: progressInstance.start,
    finish: progressInstance.finish,
    fail: progressInstance.fail,

    install(app: App) {
      app.provide(PROGRESS_KEY, progress);
    },
  };

  return progress;
}
