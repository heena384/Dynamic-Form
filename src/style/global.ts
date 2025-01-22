import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`



*,
*::before,
*::after {
  box-sizing: border-box;
}


/**
 * Fix fonts that render as bold in Firefox
 */

html {
  font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  height: 100%;
}

/**
 * Firefox specific rule
 */

@-moz-document url-prefix() {
  body {
    font-weight: lighter !important;
  }
}



footer,
header,
nav,
section,
main {
  display: block;
}

body {
  overflow: hidden;
  margin: 0;
  height: 100%;
  color: #121E32;
  font-family: Arial, Helvetica, sans-serif !important;

  #root {
    height: 100%;    
    width: 100%;
  }
}
`;

export default GlobalStyle;
