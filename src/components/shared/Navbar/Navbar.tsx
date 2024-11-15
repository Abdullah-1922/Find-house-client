import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import navbarLogo from '../../../../public/assets/logo/logo-light-dark.svg';
import Image from 'next/image';
import languageLogo from '../../../../public/assets/logo/globe.png';
import Sidebar from './SideBar/Sidebar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const Navbar = () => {
  return (
    <>
      <div className="lg:flex hidden z-[999] absolute w-full text-gray-900">
        <div className="menu-bar ">
          <div className="flex items-center gap-10">
            <Link href={'/'} className="logo">
              <Image
                className="w-14"
                width={1000}
                height={1000}
                src={navbarLogo}
                alt="navigation logo"
              />
            </Link>
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
          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center gap-x-2 items-center bg-gray-300 px-2 rounded-md">
              <Image
                className="w-5"
                src={languageLogo}
                alt="world svg for language"
                width={1000}
                height={1000}
              />
              <h2 className="font-bold">ENG</h2>
            </div>
            <h2 className="border-r border-l border-gray-700 px-3 ">Sign In</h2>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar flex justify-center items-center w-36 bg-gray-50/50 hover:bg-gray-200/60"
              >
                <div className="w-10 rounded-full">
                  <Image
                    width={1000}
                    height={1000}
                    alt="user profile image"
                    src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg"
                  />
                </div>
                <h3 tabIndex={0} role="button" className="text-sm">
                  Hi, Mary <i className="fas fa-caret-right text-gray-500"></i>
                </h3>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href={'#'} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href={'#'}>Settings</Link>
                </li>
                <li>
                  <Link href={'#'}>Logout</Link>
                </li>
              </ul>
            </div>

            <Link href={'/dashboard/user'}>
              <Button className="text-white py-3 px-5 bg-gray-800 hover:bg-gray-900 h-[45px] rounded font-bold">
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
