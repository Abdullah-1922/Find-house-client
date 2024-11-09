import Image from 'next/image';
import NavbarLogo from '../../../../../public/assets/logo/logo-white-1.svg';
import './Sidebar.css';

interface CustomCSSProperties extends React.CSSProperties {
  '--i'?: string; // Allow custom property --i
}

const Sidebar: React.FC = () => {
  return (
    <header>
      <div className="container ">
        <input type="checkbox" id="check" />
        
        <div className="logo-container">
          <h3 className="logo">
          <Image className='w-14 p-1' width={1000} height={1000} src={NavbarLogo} alt="navigation logo" />
                
          </h3>
        </div>

        <div className="nav-btn-side">
          <div className="nav-links">
            <ul>
              <li className="nav-link" style={{ '--i': '.6s' } as CustomCSSProperties}>
                <a href="#">Home</a>
              </li>
              <li className="nav-link" style={{ '--i': '.85s' } as CustomCSSProperties}>
                <a href="#">Listing<i className="fas fa-caret-down"></i></a>
                <div className="dropdown-sidebar">
                  <ul>
                    <li className="dropdown-sidebar-link">
                      <a href="#">Listing Grid</a>
                    </li>
                    <li className="dropdown-sidebar-link">
                      <a href="#">Listing List</a>
                    </li>
                    <li className="dropdown-sidebar-link" style={{ '--i': '1s' } as CustomCSSProperties}>
                      <a href="#">All Agents</a>
                   
                    </li>
                   
                  </ul>
                </div>
              </li>
              <li className="nav-link" style={{ '--i': '1.1s' } as CustomCSSProperties}>
                <a href="#">Pages<i className="fas fa-caret-down"></i></a>
                <div className="dropdown-sidebar">
                  <ul>
            
                    <li className="dropdown-sidebar-link" style={{ '--i': '1.1s' } as CustomCSSProperties}>
                      <a href="#">Shop<i className="fas fa-caret-down"></i></a>
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
                    <li className="dropdown-sidebar-link" style={{ '--i': '1s' } as CustomCSSProperties}>
                      <a href="#">About Us</a>
                   
                    </li>
                    <li className="dropdown-sidebar-link" style={{ '--i': '1s' } as CustomCSSProperties}>
                      <a href="#">Faq</a>
                   
                    </li>
                    <li className="dropdown-sidebar-link" style={{ '--i': '1s' } as CustomCSSProperties}>
                      <a href="#">Coming Soon</a>
                   
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-link" style={{ '--i': '1.35s' } as CustomCSSProperties}>
                <a href="#">Blogs</a>
              </li>
              <li className="nav-link" style={{ '--i': '1.35s' } as CustomCSSProperties}>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className='flex flex-wrap justify-center items-center gap-5'>
        <div className='flex justify-center gap-x-2 items-center'>
        <i className="fas fa-globe-americas text-white"></i>
        <h2 className='font-bold border-r border-white pr-5 text-white'>ENG</h2>
        </div>
        <h2 className='border-r border-white pr-5 text-white'>Sign In</h2>
         
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex justify-center items-center w-36">
        <div className="w-10 rounded-full">
          <Image
          width={1000}
          height={1000}
            alt="user profile image"
            src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg" />
 
         
        </div>
        <h3 tabIndex={0} role="button" className='text-white text-sm'>Hi, Mary <i className="fas fa-caret-right text-gray-500"></i></h3>
      </div>
      
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
   
        <button className='text-white py-3 px-5 bg-gray-600 rounded font-bold'>Add Listing <i className="fas fa-laptop-house ml-2"></i></button>

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
