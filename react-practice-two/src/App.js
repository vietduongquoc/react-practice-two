// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { publicRoutes } from './routes'

// function App() {
//   return (
//     <Router>
//       <div className='App'>
//         <Routes>
//           {publicRoutes.map((route, index) => {
//             const Page = route.component;
//             return <Route key={index} path={route.path} element={<Page />} />;
//           } )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// const App = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/login" component={Login} />
//                 <Route path="/register" component={Register} />
//                 <Route path="/" component={Login} />
//             </Switch>
//         </Router>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
