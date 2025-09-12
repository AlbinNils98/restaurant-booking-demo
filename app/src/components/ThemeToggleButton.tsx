import { IconButton, useTheme } from '@mui/material'
import { useThemeContext } from '../context/Theme';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggleButton = () => {
  const theme = useTheme();
  const colorMode = useThemeContext();

  return (
    <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}

export default ThemeToggleButton;