
/**
 * Launches the React-App
 * @author Alexandru Stan
 * @course ICS4U
 * @teacher Mrs. McCaffery
 * @since June 2023
 */

//import dependencies
import ReactDOM from 'react-dom'
import App from "./components/App.jsx"

//get the root element of the website (a div)
const rootElement = document.getElementById("root")

//render the website components
ReactDOM.render(<App />, rootElement);