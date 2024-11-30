import "./dashboardNavbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import Sidebar from "../Navbar/SideBar/Sidebar";
import UserProfileDropdown from "../Navbar/UserProfileDropdown";

const DashboardNavbar = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="fixed top-0 lg:flex hidden z-[999] w-full text-gray-900">
        <div className="menu-bar flex flex-row justify-between items-center bg-gray-800 gap-2 md:p-5 w-full mr-64 py-3 px-3">
          <div className="flex items-center gap-10">
            <ul className="px-2 space-x-4">
              <li>
                <Link href="/">
                  Home <i className="fas"></i>
                </Link>
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
            </ul>
          </div>
          {/* Right-side options */}
          <UserProfileDropdown />
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex">
        {/* Sidebar component for mobile */}
        <Sidebar></Sidebar>
      </div>
    </>
  );
};

export default DashboardNavbar;
