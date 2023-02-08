import { createTheme, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomPalette {
    mint: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    mattRed: true;
    mattBlue: true;
  }
}

const font_name = "Helvetica";
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DDDDDD",
    },
    secondary: {
      main: "#30475E",
    },
    mint: {
      main: "#F05454",
    },
    background: {
      default: "#222831",
    },
  },
  typography: {
    h1: {
      fontFamily: font_name,
      color: "#30475E",
    },
    h2: {
      fontFamily: font_name,
      color: "#30475E",
    },
    h3: {
      fontFamily: font_name,
      color: "#30475E",
    },
    h4: {
      fontFamily: font_name,
      color: "#30475E",
    },
    h5: {
      fontFamily: font_name,
      color: "#30475E",
    },
    h6: {
      fontFamily: font_name,
      color: "#30475E",
    },
    body1: {
      fontFamily: font_name,
      color: "#30475E",
    },
    body2: {
      fontFamily: font_name,
      color: "#30475E",
    },
  },
});
