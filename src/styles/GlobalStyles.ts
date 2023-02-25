import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --color-text: #FFF;
    --color-text-in-primary: #000;
    --color-primary: #3ec863;
    --color-secondary: #504D90;
    --color-tertiary: #221E5D;
    --color-border: rgba(255, 255, 255, 0.2);
    --color-sucess: #7cc39c;
    --color-warning: #fbea85;
    --color-error: #ea524f;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, html {
    width: 100vw;
    height: 100vh;
    color: #FFF;
  }
  body {
    background: linear-gradient(250deg, var(--color-secondary) -12%, var(--color-tertiary) 114%);
  }

  body, input, button, textarea {
    font-family:'Lato', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;