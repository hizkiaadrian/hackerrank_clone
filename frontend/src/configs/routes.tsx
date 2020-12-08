import AdminLogin from "../pages/Admin/Login";
import Assessment from "../pages/Assessment";
import Login from "../pages/Login";
import PageNotFound from "../pages/NotFound";
import ThankYou from "../pages/ThankYou";
import AdminDashboard from '../pages/Admin/Dashboard/index';

const routes: {path: string, component: any, exact: boolean, guarded: boolean}[] = [
    {path:'/', component: Login, exact:true, guarded: false},
    {path:'/admin/login', component: AdminLogin, exact: false, guarded: false},
    {path:'/admin/dashboard', component: AdminDashboard, exact: false, guarded: true},
    {path:'/assessment', component: Assessment, exact:false, guarded: false},
    {path:'/thank-you', component:ThankYou, exact:false, guarded: false},
    {path:'/*', component: PageNotFound, exact:false, guarded: false}
];

export default routes;