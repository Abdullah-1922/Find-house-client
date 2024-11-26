"use client";

import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import navbarLogo from "../../../../public/assets/logo/logo-light-dark.svg";
import Image from "next/image";
import Sidebar from "./SideBar/Sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserProfileDropdown from "./UserProfileDropdown";
import SignInModal from "@/app/(commonLayout)/_components/modal/signInModal";
import { useUser } from "@/hooks/user.hook";

const Navbar = () => {
  const { user } = useUser();

  return (
    <>
      <div className="absolute top-0 z-[999] w-full">
        <div className="lg:flex hidden">
          <div className="menu-bar ">
            <div className="flex items-center gap-10">
              <Link href={"/"} className="logo">
                <Image
                  className="w-14"
                  width={1000}
                  height={1000}
                  src={navbarLogo}
                  alt="navigation logo"
                />
              </Link>
              <ul className="px-2 space-x-4">
                <li>
                  <Link href="#">
                    Home <i className="fas fa-caret-down"></i>
                  </Link>
                  <div className="dropdown-menu mt-0.5">
                    <ul>
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="/home-map">Home Map</Link>
                      </li>
                      <li>
                        <Link href="/home-video">Home Video</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link href="#">
                    Listing <i className="fas fa-caret-down"></i>
                  </Link>
                  <div className="dropdown-menu mt-0.5">
                    <ul>
                      <li>
                        <Link href="/list-grid">Listing Grid</Link>
                      </li>
                      <li>
                        <Link href="#">Listing List</Link>
                      </li>
                      <li>
                        <Link href="/all-agents">All Agents</Link>
                      </li>
                      <li>
                        <Link href="/agencies">All Agencies</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link href="/all-properties">Properties</Link>
                </li>
                <li>
                  <Link href="#">
                    Pages <i className="fas fa-caret-down"></i>
                  </Link>
                  <div className="dropdown-menu mt-0.5">
                    <ul>
                      <li>
                        <Link href="#">
                          Shop <i className="fas fa-caret-right"></i>
                        </Link>
                        <div className="dropdown-menu-1 ml-1 -mt-0.5">
                          <ul>
                            <li>
                              <Link href="#">Order Page</Link>
                            </li>
                            <li>
                              <Link href="/products">All Product</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <Link href="/about-us">About US</Link>
                      </li>

                      <li>
                        <Link href="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link href="/pricing-packages">Pricing Table</Link>
                      </li>
                      <li>
                        <Link href="/coming-soon">Coming Soon</Link>
                      </li>
                      <li>
                        <Link href="/under-constrauction">
                          Under construction
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link href="/blogs">Blog</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact us</Link>
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center gap-5">
              <SignInModal />
              {user && <UserProfileDropdown />}
              <Link
                href={`${
                  (user?.role === "user" && "user-dashboard") ||
                  (user?.role === "admin" && "admin-dashboard") ||
                  (user?.role === "agent" && "agent-dashboard")
                }`}
              >
                <Button className="text-white py-3 px-5 bg-gray-800 hover:bg-gray-900 rounded font-bold">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex">
          <Sidebar></Sidebar>
        </div>
      </div>
    </>
  );
};

export default Navbar;
