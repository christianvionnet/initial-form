import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.css";
import "./firebase/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
