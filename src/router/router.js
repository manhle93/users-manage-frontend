import Layout from "@/components/Layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard/Dashboard";
import Typography from "@/pages/ElementUI/Typography/Typography";
import Tables from "@/pages/ElementUI/Tables/Basic";
import Notifications from "@/pages/ElementUI/Notifications/Notifications";
import Icons from "@/pages/ElementUI/Icons/Icons";
import Charts from "@/pages/ElementUI/Charts/Charts";
import Maps from "@/pages/ElementUI/Maps/Google";
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
        name: "Tổng quan",
        component: Dashboard,
      },
      {
        path: "thongbao",
        name: "Thông báo",
        component: () => import("@/pages/Thongbao/index"),
      },
      {
        path: "truyenthong",
        name: "Truyền thông",
        component: Blank,
        children: [
          {
            path: "hopthu/:id",
            name: "Hộp thư",
            component: () => import("@/pages/Truyenthong/Hopthu/index"),
          },
          {
            path: "nhom/:id",
            name: "Nhóm",
            component: () => import("@/pages/Truyenthong/Nhom/index"),
          },
        ],
      },
      {
        path: "users",
        name: "Người dùng",
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
            name: "Phân quyền",
          },
          {
            path: "profile",
            component: () => import("@/pages/User/profile/index"),
            name: "Thông tin",
          },
          {
            path: "management",
            component: () => import("@/pages/User/management/index"),
            name: "Quản lý người dùng",
          },
        ],
      },
      {
        path: "danhmuc",
        name: "Danh mục",
        component: () => import("@/pages/Danhmuc/index"),
      },
      {
        path: "caidat",
        component: () => import("@/pages/Thamsohethong/index"),
        name: "Tham số hệ thống",
      },
      {
        path: "congty",
        name: "Công ty",
        component: () => import("@/pages/Congty/index"),
      },
      {
        path: "nhansu",
        name: "Quản lý nhân sự",
        component: Blank,
        children: [
          {
            path: "nhanvien",
            component: () => import("@/pages/Quanlynhansu/nhanvien/index"),
            name: "Nhân viên",
          },
          {
            path: "themnhanvien",
            component: () => import("@/pages/Quanlynhansu/nhanvien/create"),
            name: "Thêm nhân viên",
          },
          {
            path: "thongtinnhanvien/:id",
            component: () => import("@/pages/Quanlynhansu/nhanvien/show/index"),
            name: "Thông tin nhân sự",
          },

          {
            path: "baohiem",
            component: () => import("@/pages/Quanlynhansu/baohiem/index"),
            name: "Bảo hiểm",
          },
        ],
      },
      {
        path: "chamcong",
        name: "Chấm công",
        component: Blank,
        children: [
          {
            path: "danhsach",
            component: () => import("@/pages/Chamcong/danhsachchamcong/index"),
            name: "Danh sách chấm công",
          },
          {
            path: "diadiemca",
            component: () => import("@/pages/Chamcong/diadiemcalamviec/index"),
            name: "Địa điểm - Ca làm việc",
          },
          {
            path: "lichtruc",
            component: () => import("@/pages/Chamcong/lichtruc/index"),
            name: "Lịch trực",
          },
          {
            path: "xinnghi",
            component: () => import("@/pages/Chamcong/dangkynghi/index"),
            name: "Đăng ký nghỉ",
          },
          {
            path: "thaisan",
            component: () => import("@/pages/Chamcong/thaisan/index"),
            name: "Nghỉ thai sản",
          },
          {
            path: "chitiet/:id",
            component: () => import("@/pages/Chamcong/chitietchamcong/index"),
            name: "Chi tiết chấm công",
          },
          {
            path: "tangca",
            component: () => import("@/pages/Chamcong/tangca/index"),
            name: "Tăng ca",
          },
        ],
      },
      {
        path: "baocao",
        name: "Báo cáo",
        component: () => import("@/pages/Baocao/index"),
      },
      {
        path: "baocao/:id",
        name: "Báo cáo",
        component: () => import("@/pages/Baocao/baocao"),
      },
      {
        path: "ui-elements",
        name: "UI Elements",
        component: Blank, //Component rỗng cho Menu có menu con
        children: [
          {
            path: "icons",
            name: "Icons",
            component: Icons,
          },
          {
            path: "charts",
            name: "Charts",
            component: Charts,
          },
          {
            path: "maps",
            name: "Maps",
            component: Maps,
          },
          {
            path: "notifications",
            name: "Notifications",
            component: Notifications,
          },
          {
            path: "typography",
            name: "Typography",
            component: Typography,
          },
          {
            path: "tables",
            name: "Tables",
            component: Tables,
          },
        ],
      },
    ],
  },
];
