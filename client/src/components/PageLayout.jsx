import React from "react";
import Header from "../components/Header";
import logoImg from "../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { protectedNavlinks } from "../lib/data";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../features/authSlice";
import useToast from "../hooks/useToast";

const PageLayout = ({ sidebar = false }) => {
  const { dispatch } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const res = await fetch("http://localhost:3001/api/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    const data = await res.json();
    dispatch(logout());
    toast(data.message, "success");
    navigate("/login");
  };

  if (!sidebar) {
    return (
      <main>
        <Header />
        <div className="h-custom">
          <Outlet />
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex h-screen">
        <aside className="w-[200px] bg-primary fixed left-0 h-full z-10 px-2 pt-8 shadow-[1px_8px_10px_2px_rgba(0,0,0,0.08)]">
          <div className="relative h-full flex flex-col">
            <Link to="/profile" className="self-center mb-10">
              <img className="max-w-[90px]" src={logoImg} alt="Logo" />
            </Link>
            <div className="h-[50%] flex flex-col items-center rounded-md bg-white/20 backdrop-blur-md shadow-sm overflow-hidden">
              {protectedNavlinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-2 w-full px-4 font-medium hover:bg-slate-200 cursor-pointer transition-all ${
                      isActive ? "bg-slate-200" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <button
            className="group p-2 w-fit h-fit flex items-center justify-center rounded-full bg-tertiary/40 hover:bg-tertiary absolute bottom-4 right-4 transition-all hover:scale-110 focus:scale-105"
            onClick={logoutHandler}
          >
            <LogoutIcon className="!fill-white group-hover:!fill-black transition-all" />
          </button>
        </aside>
        <div className="ms-[200px] w-custom p-8 bg-tertiary overflow-y-scroll">
          <Outlet />
        </div>
      </main>
    );
  }
};

export default PageLayout;
