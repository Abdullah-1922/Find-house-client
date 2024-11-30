'use client';
import Image from 'next/image';
import NavbarLogo from '../../../../../public/assets/logo/logo-white-1.svg';
import './Sidebar.css';
import Link from 'next/link';
import SignInModal from '@/app/(commonLayout)/_components/modal/signInModal';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/user.hook';

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
            <Link href={'/'}>
              {' '}
              <Image
                className="w-14 p-1"
                width={1000}
                height={1000}
                src={NavbarLogo}
                alt="navigation logo"
              />
            </Link>
          </h3>
        </div>

        <div className="nav-btn-side">
          <div className="nav-links">
            <ul>
              <li
                className="nav-link"
                style={{ '--i': '.6s' } as CustomCSSProperties}
              >
                <Link href={'/'}>Home</Link>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '.85s' } as CustomCSSProperties}
              >
                <a>
                  Listing<i className="fas fa-caret-down"></i>
                </a>

                <div className="dropdown-sidebar">
                  <ul>
                    <li className="dropdown-sidebar-link">
                      <Link href="/list-grid">Listing Grid</Link>
                    </li>
                    <li className="dropdown-sidebar-link">
                      <Link href="/all-agents">All Agents </Link>
                    </li>
                    <li className="dropdown-sidebar-link">
                      <Link href="/agencies">All Agencies </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '1.35s' } as CustomCSSProperties}
              >
                <Link href="/all-properties">All Properties</Link>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '1.1s' } as CustomCSSProperties}
              >
                <a>
                  Pages<i className="fas fa-caret-down"></i>
                </a>
                <div className="dropdown-sidebar">
                  <ul>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1.1s' } as CustomCSSProperties}
                    >
                      <a>
                        Shop<i className="fas fa-caret-down"></i>
                      </a>
                      <div className="dropdown-sidebar second">
                        <ul>
                          <li className="dropdown-sidebar-link">
                            <Link href="/products">All Products</Link>
                          </li>
                          <li className="dropdown-sidebar-link">
                            <Link href="/payment">Order Page</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <Link href="/faq">Faq</Link>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <Link href="/pricing-packages">Pricing Table</Link>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <Link href="/coming-soon">Coming Soon</Link>
                    </li>
                    <li
                      className="dropdown-sidebar-link"
                      style={{ '--i': '1s' } as CustomCSSProperties}
                    >
                      <Link href="/under-constrauction">
                        Under-Construction
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '1.35s' } as CustomCSSProperties}
              >
                <Link href="/blogs">Blogs</Link>
              </li>
              <li
                className="nav-link"
                style={{ '--i': '1.35s' } as CustomCSSProperties}
              >
                <Link href="/contact-us">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 md:p-5">
            <SignInModal />
            {user && (
              <div className="flex gap-2 items-center p-1  font-semibold px-3 text-white border border-white rounded-3xl">
                <div>
                  <Image
                    width={100}
                    height={100}
                    src={user?.image}
                    alt={user?.firstName}
                    className="object-cover w-10 h-10  rounded-full"
                  />
                </div>
                <p>{user?.firstName}</p>
              </div>
            )}
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
