export const triggerRipple = (boundingRef, touchRippleRef) => {
  const container = boundingRef.current;
  const rect = container.getBoundingClientRect();

  touchRippleRef.current.start(
    {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    },
    { center: false }, // when center is true, the ripple doesn't travel to the border of the container
  );

  setTimeout(() => touchRippleRef.current.stop({}), 320);
}
