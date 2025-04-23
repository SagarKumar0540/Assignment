import AppNavigator from "./src/navigation/appNavigator";
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import { ThemeProvider } from "./src/context/themeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store} >
        <AppNavigator />
      </Provider>
    </ThemeProvider>
  )
}


export default App;