import AdminLogin from "../pages/Admin/Login";
import Assessment from "../pages/Assessment";
import Login from "../pages/Login";
import PageNotFound from "../pages/NotFound";
import ThankYou from "../pages/ThankYou";
import AdminDashboard from '../pages/Admin/Dashboard/index';

const routes: {path: string, component: any, exact: boolean}[] = [
    {path:'/', component: Login, exact:true},
    {path:'/admin/login', component: AdminLogin, exact: false},
    {path:'/admin/dashboard', component: AdminDashboard, exact: false},
    {path:'/assessment', component: Assessment, exact:false},
    {path:'/thank-you', component:ThankYou, exact:false},
    {path:'/*', component: PageNotFound, exact:false}
];

export default routes;