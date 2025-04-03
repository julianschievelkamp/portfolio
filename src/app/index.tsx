import GlobalStyle from "styles/global";
import { StyledApp } from "./styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";
import { darkTheme, lightTheme } from "styles/variables";

const App = () => {
  const { theme, toggleTheme, isLoading } = useTheme();

  if (isLoading) return <></>;

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <StyledApp>
        <GlobalStyle />

        <button onClick={() => toggleTheme()}>Toggle Theme</button>
        <div>Hello World!</div>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
