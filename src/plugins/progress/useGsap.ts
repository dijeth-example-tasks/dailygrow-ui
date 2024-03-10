import { gsap } from 'gsap';
import type { Ref } from 'vue';

export function useGsap(tweenedRef: Ref<GSAPTweenTarget | number>, options: GSAPTweenVars) {
  let tween: GSAPTween;

  return {
    start({ from, to }: { from?: number; to?: number }) {
      if (tween) {
        tween.kill();
      }
      if (to !== undefined && from !== undefined) {
        tween = gsap.fromTo(tweenedRef, { value: from }, { value: to, ...options });
      } else if (to !== undefined) {
        tween = gsap.to(tweenedRef, { value: to, ...options });
      } else if (from !== undefined) {
        tween = gsap.from(tweenedRef, { value: from, ...options });
      }
      return tween;
    },
    getTween: () => tween,
  };
}
