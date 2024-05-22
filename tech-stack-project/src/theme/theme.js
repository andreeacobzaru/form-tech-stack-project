import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        light: '#ffd75f',
        main: '#ffcd37',
        dark: '#b28f26',
        contrastText: '#000',
      },
      secondary: {
        light: '#ba8a8a',
        main: '#a96d6d',
        dark: '#764c4c',
        contrastText: '#fff',
      },
      error: {
        light: '#ba8a8a',
        main: '#a96d6d',
        dark: '#764c4c',
        contrastText: '#fff',
      },
    },
  });

export default theme;