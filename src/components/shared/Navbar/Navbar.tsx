import './Navbar.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import navbarLogo from '../../../../public/assets/logo/logo-light-dark.svg'
import Image from 'next/image';
const Navbar = () => {
    return (
        <div>
            <div className="menu-bar">
      <h1 className="logo">
       <Image className='w-14' width={1000} height={1000} src={navbarLogo} alt="navigation logo" />
      </h1>
      <ul>
         <li>
          <a href="#">
           Home<i className="fas fa-caret-down"></i>
          </a>
          <div className="dropdown-menu">
            <ul>
              <li>
                <a href="#">Home Map</a>
              </li>
              <li>
                <a href="#">Home Video</a>
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
                <a href="#">Listing Grid</a>
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
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Contact us</a>
        </li>
      </ul>
      <div className='flex justify-center items-center gap-5'>
        <h2 className='font-bold border-r border-gray-700 pr-5'>ENG</h2>
        <h2 className='border-r border-gray-700 pr-5'>Sign In</h2>
        <button className='text-white py-3 px-5 bg-gray-600 rounded font-bold'>Add Listing</button>
      </div>
    </div>
        </div>
    );
};

export default Navbar;