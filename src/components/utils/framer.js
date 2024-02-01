export const FramerScrollRight = (pages, setPages, setX) => {
  setPages(pages + 1);
  localStorage.setItem("pages", pages + 1);
  localStorage.setItem("x", 1000);
  setX(1000);
};
export const FramerScrollLeft = (pages, setPages, setX) => {
  setPages(pages - 1);
  localStorage.setItem("pages", pages - 1);
  localStorage.setItem("x", 1000);
  setX(1000);
};
