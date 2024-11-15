import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import navbarLogo from "../../../../public/assets/logo/logo-light-dark.svg";
import Image from "next/image";
import languageLogo from "../../../../public/assets/logo/globe.png";
import Sidebar from "./SideBar/Sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <>
      <div className="lg:flex  hidden">
        <div className="menu-bar ">
          <div className="flex items-center gap-10">
            <h1 className="logo">
              <Image
                className="w-14"
                width={1000}
                height={1000}
                src={navbarLogo}
                alt="navigation logo"
              />
            </h1>
            <ul>
              <li>
                <a href="#">
                  Home <i className="fas fa-caret-down"></i>
                </a>
                <div className="dropdown-menu">
                  <ul>
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
                <a href="#">
                  Listing <i className="fas fa-caret-down"></i>
                </a>
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <Link href="/list-grid">Listing Grid</Link>
                    </li>
                    <li>
                      <a href="#">Listing List</a>
                    </li>
                    <li>
                      <a href="#">All Agents</a>
                    </li>
                    <li>
                      <a href="#">All Agencies</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="#">
                  Pages <i className="fas fa-caret-down"></i>
                </a>
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <a href="#">
                        Shop <i className="fas fa-caret-right"></i>
                      </a>
                      <div className="dropdown-menu-1">
                        <ul>
                          <li>
                            <a href="#">Order Page</a>
                          </li>
                          <li>
                            <a href="#">All Product</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="#">About US</a>
                    </li>

                    <li>
                      <a href="#">FAQ</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link href="/blogs">Blog</Link>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center gap-x-2 items-center">
              <Image
                className="w-5"
                src={languageLogo}
                alt="world svg for language"
                width={1000}
                height={1000}
              />
              <h2 className="font-bold border-r border-gray-700 pr-5 text-gray-600">
                ENG
              </h2>
            </div>
            <h2 className="border-r border-gray-700 pr-5">Sign In</h2>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar flex justify-center items-center w-36"
              >
                <div className="w-10 rounded-full">
                  <Image
                    width={1000}
                    height={1000}
                    alt="user profile image"
                    src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg"
                  />
                </div>
                <h3
                  tabIndex={0}
                  role="button"
                  className="text-gray-500 text-sm"
                >
                  Hi, Mary <i className="fas fa-caret-right text-gray-500"></i>
                </h3>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>

            <Link href={"/dashboard/user"}>
              <Button className="text-white py-3 px-5 bg-gray-600 hover:bg-gray-700 h-[45px] rounded font-bold">
                Add Listing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex">
        <Sidebar></Sidebar>
      </div>
    </>
  );
};

export default Navbar;
