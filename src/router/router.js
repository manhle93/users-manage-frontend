import Layout from "@/components/Layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard/Dashboard";
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";
import Blank from "@/components/Blank/Layout";

export const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "*",
    name: "Error",
    component: Error,
  },

  ///////////////////////
  {
    path: "/",
    redirect: "/dashboard",
    name: "Layout",
    component: Layout,
    children: [
      //Dashboard Router write here
      {
        path: "dashboard",
        name: "ダッシュボード",
        component: Dashboard,
      },
      {
        path: "users",
        name: "ユーザー",
        component: Blank,
        children: [
          {
            path: "menus",
            component: () => import("@/pages/User/menus/index"),
            name: "Menu",
          },
          {
            path: "role",
            component: () => import("@/pages/User/roles/index"),
            name: "権限",
          },
          {
            path: "profile",
            component: () => import("@/pages/User/profile/index"),
            name: "プロファイル",
          },
          {
            path: "management",
            component: () => import("@/pages/User/management/index"),
            name: "ユーザー管理",
          },
        ],
      },
      {
        path: "customer",
        name: "Customers",
        component: Blank,
        children: [
          {
            path: "manage",
            component: () => import("@/pages/Customers/management/index"),
            name: "Customers manage",
          },
          {
            path: "add",
            component: () => import("@/pages/Customers/management/create"),
            name: "Add Customer",
          },
          {
            path: "show/:id",
            component: () => import("@/pages/Customers/management/detail"),
            name: "Show Customer",
          },
          {
            path: "edit/:id",
            component: () => import("@/pages/Customers/management/create"),
            name: "Edit Customer",
          },
          {
            path: "contract",
            component: () => import("@/pages/Customers/contract/index"),
            name: "Contract",
          },
        ],
      },
    ],
  },
];
