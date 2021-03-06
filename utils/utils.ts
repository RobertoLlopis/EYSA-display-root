export const forceTextToBeThemed = (color) => {
  const entitiesToChange = [
    "body",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "p",
    "span:not([role='img'])",
    ".ant-card",
    ".ant-card-head .ant-tabs",
  ];
  entitiesToChange.forEach((e) => {
    let selected = Array.from(document.querySelectorAll(e));
    selected.forEach((s) => (s.style.color = color));
  });
};
export const forceBackgroundToBeThemed = (bgColor) => {
  const entitiesToChange = ["body", ".ant-card"];
  entitiesToChange.forEach((e) => {
    let selected = Array.from(document.querySelectorAll(e));
    selected.forEach((s) => (s.style.backgroundColor = bgColor));
  });
};
