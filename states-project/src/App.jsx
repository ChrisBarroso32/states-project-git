import "../src/App.css"
import UserProfile from "./components/UserProfile.jsx"
import { UserContextProvider } from "./contexts/user-context-provider.jsx"

const App = () => {
  return (
  <div>
    <UserContextProvider>
      <UserProfile/>
    </UserContextProvider>
  </div>
)
}

export default App
