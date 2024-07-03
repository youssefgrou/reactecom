// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import '../../assets/admin/css/styles.css';
// import '../../assets/admin/js/scripts';

// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import Footer from './Footer';

// import routes from '../../routes/routes';

// const MasterLayout = () => {
//     return (
//         <div className="sb-nav-fixed">
//             <Navbar />
//             <div id="layoutSidenav">
//                 <div id="layoutSidenav_nav">
//                     <Sidebar />
//                 </div>
//                 <div id="layoutSidenav_content">
//                     <main>
//                         <Routes>
//                             {routes.map((route, idx) => {
//                                 return (
//                                     route.component && (
//                                         <Route 
//                                             key={idx}
//                                             path={route.path}
//                                             exact={route.exact}
//                                             element={<route.component />}
//                                         />
//                                     )
//                                 );
//                             })}
//                             <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
//                         </Routes>
//                     </main>
//                     <Footer />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MasterLayout;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import routes from '../../routes/routes';

const MasterLayout = () => {
    const isLoggedIn = !!localStorage.getItem('auth_token');

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Routes>
                            {routes.map((route, idx) => (
                                route.component && (
                                    <Route 
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        element={<route.component />}
                                    />
                                )
                            ))}
                            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;

