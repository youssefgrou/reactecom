// // src/components/admin/orders/Order.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import $ from 'jquery';

// function Order() {
//     const [loading, setLoading] = useState(true);
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         let isMounted = true;
//         document.title = "Orders";

//         axios.get(`/api/admin/orders`).then(res => {
//             if (isMounted) {
//                 if (res.data.status === 200) {
//                     setOrders(res.data.orders);
//                     setLoading(false);
//                 }
//             }
//         }).catch(error => {
//             console.error("There was an error fetching the orders: ", error);
//             setLoading(false);
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, []);

//     useEffect(() => {
//         if (!loading) {
//             $('#ordersTable').DataTable();
//         }
//     }, [loading]);

//     if (loading) {
//         return <h4>Loading Orders...</h4>;
//     }

//     const display_orders = orders.map((item) => {
//         return (
//             <tr key={item.id}>
//                 <td>{item.tracking_no}</td>
//                 <td>{item.address}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.payment_mode}</td>
//                 <td>{item.email}</td>
//                 <td>
//                     <Link to={`/admin/orders/view-order/${item.id}`} className="btn btn-success btn-sm">View</Link>
//                 </td>
//             </tr>
//         );
//     });

//     return (
//         <div className="container px-4 mt-3">
//             <div className="card">
//                 <div className="card-header">
//                     <h4>Orders</h4>
//                 </div>
//                 <div className="card-body">
//                     <div className="table-responsive">
//                         <table id="ordersTable" className="table table-bordered table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Tracking No.</th>
//                                     <th>Address</th>
//                                     <th>Phone No.</th>
//                                     <th>Payment Mode</th>
//                                     <th>Email</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {display_orders}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Order;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert2';

function Order() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let isMounted = true;
        document.title = "Orders";

        axios.get(`/api/admin/orders`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            }
        }).catch(error => {
            console.error("There was an error fetching the orders: ", error);
            setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            $('#ordersTable').DataTable();
        }
    }, [loading]);

    // const confirmOrder = (orderId) => {
    //     axios.post(`/api/admin/orders/confirm/${orderId}`).then(res => {
    //         if (res) {
    //             swal.fire("Success", res.data.message, "success");
    //             setOrders(orders.map(order => 
    //                 order.id === orderId ? { ...order, confirmed: true } : order
    //             ));
    //         } else {
    //             swal.fire("Error", res.data.message, "error");
    //         }
    //     }).catch(error => {
    //         console.error("There was an error confirming the order: ", error);
    //         swal.fire("Error", "There was an error confirming the order.", "error");
    //     });
    // };

    if (loading) {
        return <h4>Loading Orders...</h4>;
    }

    const display_orders = orders.map((item) => {
        return (
            <tr key={item.id}>
                <td>{item.tracking_no}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.payment_mode}</td>
                <td>{item.email}</td>
                {/* <td>
                    <button 
                        onClick={() => confirmOrder(item.id)} 
                        className="btn btn-success btn-sm"
                        disabled={item.confirmed}
                    >
                        {item.confirmed ? "Confirmed" : "Confirm Order"}
                    </button>
                </td> */}
            </tr>
        );
    });

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>Orders</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table id="ordersTable" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tracking No.</th>
                                    <th>Address</th>
                                    <th>Phone No.</th>
                                    <th>Payment Mode</th>
                                    <th>Email</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {display_orders}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
