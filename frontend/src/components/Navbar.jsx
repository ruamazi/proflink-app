import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, User, LayoutDashboard, Shield, LogOut } from "lucide-react";

const Navbar = () => {
 const { t } = useTranslation();

 const { user, logout } = useAuth();
 const navigate = useNavigate();
 const [isOpen, setIsOpen] = React.useState(false);

 const handleLogout = () => {
  logout();
  navigate("/");
 };

 return (
  <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
     <div className="flex items-center">
      <Link to="/" className="flex items-center">
       <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
      </Link>
     </div>

     {/* Desktop Navigation */}
     <div className="hidden md:flex items-center gap-4">
      <ThemeToggle />
      <LanguageSwitcher />

      {user ? (
       <>
        <Link
         to="/dashboard"
         className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
         <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
         <span
          className={`${t("navbar.dashboard") === "لوحة التحكم" ? "mt-1" : ""} leading-none`}
         >
          {t("navbar.dashboard")}
         </span>
        </Link>
        <Link
         to="/profile"
         className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
         <User className="h-4 w-4 flex-shrink-0" />
         <span
          className={`${t("navbar.profile") === "الملف الشخصي" ? "mt-1" : ""} leading-none`}
         >
          {t("navbar.profile")}
         </span>
        </Link>
        {user.isAdmin && (
         <Link
          to="/admin"
          className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
         >
          <Shield className="h-4 w-4 flex-shrink-0" />
          <span
           className={`${t("navbar.admin") === "لوحة التحكم" ? "mt-1" : ""} leading-none`}
          >
           {t("navbar.admin")}
          </span>
         </Link>
        )}
        <button
         onClick={handleLogout}
         className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
        >
         <LogOut className="h-4 w-4 flex-shrink-0" />
         <span
          className={`${t("common.logout") === "تسجيل الخروج" ? "mt-1" : ""} leading-none`}
         >
          {t("common.logout")}
         </span>
        </button>
        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
         <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden flex-shrink-0">
          {user.avatar ? (
           <img
            src={user.avatar}
            alt={user.displayName || user.username}
            className="h-full w-full object-cover"
            onError={(e) => {
             e.target.style.display = "none";
             e.target.nextSibling.style.display = "flex";
            }}
           />
          ) : null}
          <span
           className="text-sm font-medium text-indigo-600 dark:text-indigo-300"
           style={{ display: user.avatar ? "none" : "flex" }}
          >
           {user.displayName?.charAt(0) || user.username?.charAt(0)}
          </span>
         </div>
         <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-none">
          {user.displayName || user.username}
         </span>
        </div>
       </>
      ) : (
       <>
        <Link
         to="/login"
         className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
         {t("common.signIn")}
        </Link>
        <Link
         to="/register"
         className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
         {t("common.getStarted")}
        </Link>
       </>
      )}
     </div>

     {/* Mobile menu button */}
     <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
       onClick={() => setIsOpen(!isOpen)}
       className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
       {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
     </div>
    </div>
   </div>

   {/* Mobile Navigation */}
   {isOpen && (
    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
     <div className="px-2 pt-2 pb-3 space-y-1">
      {user ? (
       <>
        <div className="px-3 py-2">
         <LanguageSwitcher />
        </div>
        <Link
         to="/dashboard"
         className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
         onClick={() => setIsOpen(false)}
        >
         <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
         <span className="leading-none">{t("navbar.dashboard")}</span>
        </Link>
        <Link
         to="/profile"
         className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
         onClick={() => setIsOpen(false)}
        >
         <User className="h-5 w-5 flex-shrink-0" />
         <span className="leading-none">{t("navbar.profile")}</span>
        </Link>
        {user.isAdmin && (
         <Link
          to="/admin"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => setIsOpen(false)}
         >
          <Shield className="h-5 w-5 flex-shrink-0" />
          <span className="leading-none">{t("navbar.admin")}</span>
         </Link>
        )}
        <button
         onClick={() => {
          handleLogout();
          setIsOpen(false);
         }}
         className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
        >
         <LogOut className="h-5 w-5 flex-shrink-0" />
         <span className="leading-none">{t("common.logout")}</span>
        </button>
       </>
      ) : (
       <>
        <div className="px-3 py-2">
         <LanguageSwitcher />
        </div>
        <Link
         to="/login"
         className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
         onClick={() => setIsOpen(false)}
        >
         {t("common.signIn")}
        </Link>
        <Link
         to="/register"
         className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
         onClick={() => setIsOpen(false)}
        >
         {t("common.getStarted")}
        </Link>
       </>
      )}
     </div>
    </div>
   )}
  </nav>
 );
};

export default Navbar;
