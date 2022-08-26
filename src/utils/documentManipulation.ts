/* eslint-disable @typescript-eslint/ban-ts-comment */
export const scrollReachThreshold = (e: Event, threshold: number) => {
  if (e.target) {
    // @ts-ignore
    const { scrollTop } = e.target;
    // @ts-ignore
    const viewportOffset = e.target.getBoundingClientRect();
    const { height } = viewportOffset;
    const totalHeightContainer =
      // @ts-ignore
      e.target.firstChild?.offsetHeight - height - threshold;
    if (scrollTop >= totalHeightContainer) {
      return true;
    } else {
      return false;
    }
  }
};
