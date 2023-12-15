export const FramerScrollRight = (pages, setPages, setX) => {
  setPages(pages + 1);
  setX(1000);
};
export const FramerScrollLeft = (pages, setPages, setX) => {
  setPages(pages - 1);
  setX(1000);
};
