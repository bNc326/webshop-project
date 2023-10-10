/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      mobile: "768px",
      tablet: "992px",
      customTablet: "1100px",
      nav: "1200px",
      laptop: "1366px",
      desktop: "1920px",
      tall: { raw: "(max-height: 650px)" },
    },
    fontSize: {
      dynamicTitle:
        "clamp(1.953rem, calc(1.953rem + ((1vw - 0.2rem) * 0.488)), 2.441rem);",
      dynamicPageTitle:
        "clamp(5rem, calc(5rem + ((1vw - 0.2rem) * 5)), 10rem)",
      dynamicLongPageTitle:
        "clamp(3rem, calc(3rem + ((1vw - 0.2rem) * 7)), 10rem);",
      dynamicTitle2:
        "clamp(2.441rem, calc(2.441rem + ((1vw - 0.2rem) * 0.611)), 3.052rem);",
      dynamicTitle3:
        "clamp(1.563rem, calc(1.563rem + ((1vw - 0.2rem) * 0.39)), 1.953rem);",
      dynamicDesc:
        "clamp(1rem, calc(1.25rem + ((1vw - 0.2rem) * 0.313)), 1.563rem);",
      dynamicLogo:
        "clamp(1.563rem, calc(1.563rem + ((1vw - 0.2rem) * 0.39)), 1.953rem);",
      dynamicBtn:
        "clamp(1.25rem, calc(1.25rem + ((1vw - 0.2rem) * 0.313)), 1.563rem);",
      dynamicList:
        "clamp(1rem, calc(1rem + ((1vw - 0.2rem) * 0.25)), 1.25rem);",
      dynamicMedium:
        "clamp(0.8rem, calc(0.8rem + ((1vw - 0.2rem) * 0.2)), 1rem);",
      dynamicSmall:
        "clamp(0.64rem, calc(0.64rem + ((1vw - 0.2rem) * 0.16)), 0.8rem);",
      dynamicFormInput:
        "clamp(1rem, calc(1rem + ((1vw - 0.2rem) * 0.25)), 1.25rem);",
      dynamicFormLabel:
        "clamp(1.25rem, calc(1.25rem + ((1vw - 0.2rem) * 0.313)), 1.563rem);",
      dynamicHelperText:
        "clamp(0.8rem, calc(0.8rem + ((1vw - 0.2rem) * 0.2)), 1rem);",
      dynamic404: "clamp(10rem, calc(10rem + ((1vw - 0.2rem) * 25)), 35rem);",
    },
  },
  plugins: [],
};
