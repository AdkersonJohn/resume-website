import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #000000;
    --surface: #1d1d1f;
    --surface-alt: #161617;
    --chip: #2d2d2f;
    --text: #f5f5f7;
    --text-secondary: #86868b;
    --hairline: rgba(255, 255, 255, 0.12);
    --nav-bg: rgba(22, 22, 23, 0.8);
    --surface-hover: #1f1f21;
    --chip-hover: #3d3d3f;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--bg);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
    letter-spacing: -0.015em;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;
