'use client';

import Image from 'next/image';
import NavbarLogo from '../../../../../public/assets/logo/logo-white-1.svg';
import './Sidebar.css';
import UserProfileDropdown from '../UserProfileDropdown';
import SignInModal from '@/app/(commonLayout)/_components/modal/signInModal';
import Link from 'next/link';
import { useUser } from '@/hooks/user.hook';
import { Button } from '@/components/ui/button';

interface CustomCSSProperties extends React.CSSProperties {
  '--i'?: string; // Allow custom property --i
}

const Sidebar: React.FC = () => {
  const { user } = useUser();
  return (
    <header>
      <div className="container ">
        <input type="checkbox" id="check" />

        <div className="logo-container">
          <h3 className="logo">
            <Image
              className="w-14 p-1"
              width={1000}
              height={1000}
              src={NavbarLogo}
              alt="navigation logo"
            />
          </h3>
        </div>

        <div className="nav-btn-side">
          <div className="nav-links">
            <ul>
              <li
                className="nav-link"
                style={{ '--i': '.6s' } as CustomCSSProperties}
              >
                <a href="#">Home</a>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '.85s' } as CustomCSSProperties}
              >
                <a href="#">
                  Listing<i className="fas fa-caret-down"></i>
                </a>
                <div className="dropdown-sidebar">
                  <ul>
                    <li className="dropdown-sidebar-link">
                      <a href="#">Listing Grid</a>
                    </li>
                    <li className="dropdown-sidebar-link">
                      <a href="#">Listing List</a>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <a href="#">All Agents</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '1.1s' } as CustomCSSProperties}
              >
                <a href="#">
                  Pages<i className="fas fa-caret-down"></i>
                </a>
                <div className="dropdown-sidebar">
                  <ul>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1.1s' } as CustomCSSProperties}
                    >
                      <a href="#">
                        Shop<i className="fas fa-caret-down"></i>
                      </a>
                      <div className="dropdown-sidebar second">
                        <ul>
                          <li className="dropdown-sidebar-link">
                            <a href="#">All Products</a>
                          </li>
                          <li className="dropdown-sidebar-link">
                            <a href="#">Order Page</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <a href="#">About Us</a>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <a href="#">Faq</a>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <a href="#">Coming Soon</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '1.35s' } as CustomCSSProperties}
              >
                <a href="#">Blogs</a>
              </li>
            </ul>
          </div>

          <div className="flex justify-center items-center gap-2 md:p-5">
            <SignInModal />
            {user && <UserProfileDropdown />}
            <Link
              href={
                user
                  ? `/${
                      user.role === 'user'
                        ? `user-dashboard`
                        : user.role === 'admin'
                        ? 'admin-dashboard'
                        : user.role === 'agent'
                        ? 'agent-dashboard'
                        : ''
                    }`
                  : '/signup'
              }
            >
              <Button className="text-white py-3 px-5 bg-gray-800 hover:bg-gray-900 rounded font-bold">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="hamburger-menu-container">
          <div className="hamburger-menu">
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Sidebar;
