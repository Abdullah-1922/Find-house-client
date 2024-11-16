import './dashboardNavbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';
import Sidebar from '../Navbar/SideBar/Sidebar';
import UserProfileDropdown from '../Navbar/UserProfileDropdown';

const DashboardNavbar = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="fixed top-0 lg:flex hidden z-[999] w-full text-gray-900">
        <div className="menu-bar flex flex-row justify-between items-center bg-gray-800 gap-5 w-full mr-64 py-3 px-3">
          <div className="flex items-center gap-10">
            <ul>
              <li>
                <Link href="#">
                  Home <i className="fas fa-caret-down"></i>
                </Link>
                <div className="dropdown-menu mt-1">
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
                <div className="dropdown-menu mt-1">
                  <ul>
                    <li>
                      <Link href="/list-grid">Listing Grid</Link>
                    </li>
                    <li>
                      <Link href="#">Listing List</Link>
                    </li>
                    <li>
                      <Link href="#">All Agents</Link>
                    </li>
                    <li>
                      <Link href="#">All Agencies</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link href="#">
                  Pages <i className="fas fa-caret-down"></i>
                </Link>
                <div className="dropdown-menu mt-1">
                  <ul>
                    <li>
                      <Link href="#">
                        Shop <i className="fas fa-caret-right"></i>
                      </Link>
                      <div className="dropdown-menu-1 ml-1 -mt-1">
                        <ul>
                          <li>
                            <Link href="#">Order Page</Link>
                          </li>
                          <li>
                            <Link href="#">All Product</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <Link href="#">About US</Link>
                    </li>

                    <li>
                      <Link href="#">FAQ</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link href="/blogs">Blog</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
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
