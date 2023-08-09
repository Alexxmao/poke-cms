import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";

function App() {
  return (
   <ChakraProvider>
    <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/shop" element={<Shop/>}/>
    </Routes>
    </Router>
   </ChakraProvider>
  );
}

export default App;
