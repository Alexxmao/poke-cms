import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";

function App() {
  return (
   <ChakraProvider>
    <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </Router>
   </ChakraProvider>
  );
}

export default App;
