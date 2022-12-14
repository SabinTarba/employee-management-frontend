import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent';
import CreateEmployeeComponent from './components/Employee/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/Employee/UpdateEmployeeComponent';
import ListOrdersComponent from './components/Ord/ListOrdersComponent';
import CreateOrderComponent from './components/Ord/CreateOrderComponent';
import ListProductsComponent from './components/Product/ListProductsComponent';
import OrdlnComponent from './components/Ordln/OrdlnComponent';

function App() {
  return (

    <div>
      <Router>

        <HeaderComponent />

        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<CreateEmployeeComponent />} />
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
          <Route path="/orders" element={<ListOrdersComponent />} />
          <Route path="/add-order" element={<CreateOrderComponent />} />
          <Route path="/products" element={<ListProductsComponent />} />
          <Route path="/ordlines/:ord" element={<OrdlnComponent />} />
        </Routes>

      </Router >


    </div>


  );
}

export default App;
