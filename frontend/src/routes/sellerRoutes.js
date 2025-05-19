
import SellerDashboard from "../pages/SellerDashboard";
export const sellerRoutes=[
    {
        path:'/seller-dashboard',
        element:<SellerDashboard/>,
        ability:['admin','seller']
    }
]

