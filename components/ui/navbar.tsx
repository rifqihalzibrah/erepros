// ui/navbar.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Define the types for nested sub-items
interface NestedSubItem {
  href: string;
  label: string;
}

// Define the types for sub-items
interface SubItem {
  href?: string; // Make href optional
  label: string;
  nestedSubItems?: NestedSubItem[];
}

// Define the types for MenuItem props
interface MenuItemProps {
  href?: string; // Made optional
  label: string;
  subItems?: SubItem[];
  mobile?: boolean;
}

// Logo Component
interface LogoProps {
  src: string;
  alt: string;
}

export const Logo: React.FC<LogoProps> = ({ src, alt }) => (
  <Link href="/" className="text-2xl font-bold text-white">
    <Image
      src={src}
      alt={alt}
      className="h-14 w-auto"
      width={300}
      height={150}
    />
  </Link>
);

// Define the types for TopSubItem
interface TopSubItem {
  href: string;
  label: string;
}

// Define the types for TopMenuItemProps
interface TopMenuItemProps {
  href?: string;
  label: string;
  subItems?: TopSubItem[];
}

// TopMenu Component
export const TopMenu: React.FC<{ items: TopMenuItemProps[] }> = ({ items }) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-10 items-center space-x-4">
          {items.map((item, idx) => (
            <TopMenuItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// TopMenuItem Component

const TopMenuItem: React.FC<{ item: TopMenuItemProps }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  // Timer for delayed closing
  let closeTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    clearTimeout(closeTimeout);
    if (hasSubItems) {
      setIsOpen(true); // Open sub-items on hover
    }
  };

  const handleMouseLeave = () => {
    // Delay closing the sub-items
    closeTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Set delay (in milliseconds)
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href || '#'}
        className="block py-2 rounded-md text-base font-medium text-gold"
      >
        <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-300 ease-out uppercase text-sm">
          {item.label}
        </span>
      </Link>
      {hasSubItems && isOpen && (
        <div className="absolute right-0 mt-2 w-56 p-2 bg-gold z-[100]">
          {item.subItems?.map((subItem, subIdx) => (
            <Link
              key={subIdx}
              href={subItem.href}
              className="block px-4 py-2 text-sm text-white"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// MenuItem Component
export const MenuItem: React.FC<MenuItemProps> = ({ href, label, subItems, mobile }) => {
  const [isOpenSubItems, setIsOpenSubItems] = useState(false); // State for sub-items
  const [openNestedSubItemIndex, setOpenNestedSubItemIndex] = useState<number | null>(null); // State for nested sub-items
  const hasSubItems = subItems && subItems.length > 0;

  // Timer for delayed closing
  let closeTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout); // Clear any pending close timeout
    if (hasSubItems) {
      setIsOpenSubItems(true); // Open sub-items on hover
    }
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsOpenSubItems(false); // Delay closing the sub-items
    }, 100); // set delay
  };

  // Toggle nested sub-items for a specific index
  const handleToggleNestedSubItems = (index: number) => {
    setOpenNestedSubItemIndex(openNestedSubItemIndex === index ? null : index);
  };

  // Render nested sub-items
  const renderNestedSubItems = (nestedSubItems: NestedSubItem[], nestedIndex: number) => (
    <div className={`pl-6 ${openNestedSubItemIndex === nestedIndex ? 'block' : 'hidden'}`}>
      {nestedSubItems.map((nestedItem, idx) => (
        <Link
          key={idx}
          href={nestedItem.href}
          className="block px-3 py-2 rounded-md text-base font-medium text-white font-marcellus"
        >
          <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-300 ease-out">
            {nestedItem.label}
          </span>
        </Link>
      ))}
    </div>
  );

  // Render sub-items, including nested ones
  const renderSubItems = () => {
    return subItems?.map((item, idx) => {
      const hasNestedSubItems = item.nestedSubItems && item.nestedSubItems.length > 0;

      return (
        <div key={idx}>
          {hasNestedSubItems ? (
            <div>
              <button
                className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-white font-marcellus focus:outline-none"
                onClick={() => handleToggleNestedSubItems(idx)}
              >
                {/* Label and arrow positioned in flex container */}
                <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-300 ease-out">
                  {item.label}
                </span>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-200 ml-2 ${openNestedSubItemIndex === idx ? 'rotate-180' : ''
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 8l4 4 4-4"
                  />
                </svg>
              </button>
              {renderNestedSubItems(item.nestedSubItems!, idx)}
            </div>
          ) : (
            <Link
              href={item.href || '#'}
              className="block px-3 py-2 rounded-md text-base font-medium text-white font-marcellus"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-300 ease-out">
                {item.label}
              </span>
            </Link>
          )}
        </div>
      );
    });
  };

  if (mobile) {
    // **Mobile View Modification Starts Here**
    return (
      <div className="block text-base font-medium text-white">
        {/* Mobile Version */}
        {hasSubItems ? (
          // Render a button if the item has sub-items
          <button
            className="flex justify-between items-center w-full px-3 py-2 rounded-md focus:outline-none"
            onClick={() => setIsOpenSubItems(!isOpenSubItems)}
          >
            <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-300 ease-out">
              {label}
            </span>
            <svg
              className={`h-4 w-4 transform transition-transform duration-200 ${isOpenSubItems ? 'rotate-180' : ''
                }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 8l4 4 4-4"
              />
            </svg>
          </button>
        ) : (
          // Render a Link if the item does not have sub-items
          <Link
            href={href || '#'}
            className="flex justify-between items-center px-3 py-2 rounded-md"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_1px] bg-no-repeat hover:bg-[length:100%_1px] transition-all duration-300 ease-out">
              {label}
            </span>
          </Link>
        )}
        {hasSubItems && isOpenSubItems && <div className="pl-6">{renderSubItems()}</div>}
      </div>
    );
  }

  // Desktop View (unchanged from previous solution)
  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative text-center">
        {hasSubItems ? (
          // If the item has sub-items, render a button to trigger dropdown
          <button className="text-xs text-white uppercase tracking-widest pb-1 focus:outline-none">
            {label}
          </button>
        ) : (
          // If the item does not have sub-items, render a Link
          <Link href={href || '#'} className="text-xs text-white uppercase tracking-widest pb-1 focus:outline-none">
            {label}
          </Link>
        )}
        {/* Underline Animation */}
        <span className="block h-[1px] bg-white absolute left-0 bottom-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
      </div>
      {/* Dropdown for sub-items */}
      {hasSubItems && isOpenSubItems && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-gold shadow-lg opacity-100 z-50 p-3 transition-opacity duration-300">
          <div className="py-1">{renderSubItems()}</div>
        </div>
      )}
    </div>
  );
};

// MobileMenuButton Component
interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  toggleMenu,
}) => (
  <button
    onClick={toggleMenu}
    type="button"
    className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    aria-controls="mobile-menu"
    aria-expanded={isOpen}
  >
    <span className="sr-only">Open main menu</span>
    <svg
      className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
    <svg
      className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

// MobileMenu Component
interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement<MenuItemProps>[];
  topMenuItems?: TopMenuItemProps[]; // Include topMenuItems for mobile menu
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  children,
}) => {
  useEffect(() => {
    // Function to check if the screen size is mobile (sm and below)
    const handleBodyOverflow = () => {
      const isMobile = window.innerWidth < 1280;
      if (isOpen && isMobile) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    };

    // Run the check on mount and when isOpen changes
    handleBodyOverflow();

    // Add resize event listener to handle window resizing
    window.addEventListener('resize', handleBodyOverflow);

    return () => {
      document.body.classList.remove('overflow-hidden'); // Clean up
      window.removeEventListener('resize', handleBodyOverflow); // Cleanup resize event listener
    };
  }, [isOpen]);

  return (
    <>

      {/* Mobile Menu */}
      <div
        className={`fixed top-19 right-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 h-[calc(100vh_-_4rem)] bg-gold z-50 transform transition-transform duration-300 ease-in-out xl:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Render main menu items */}
          {children.map((child, idx) => (
            <div key={idx}>{React.cloneElement(child, { mobile: true })}</div>
          ))}
        </div>
      </div>
    </>
  );
};

// Update MenuProps interface
interface MenuProps {
  children: React.ReactElement<MenuItemProps>[];
  topMenuItems?: TopMenuItemProps[];
}

// Menu Component
export const Menu: React.FC<MenuProps> = ({ children, topMenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true); // To track if the menu should be shown
  const [lastScrollY, setLastScrollY] = useState(0); // To track the last scroll position
  const [isSticky, setIsSticky] = useState(false); // To track if the menu is sticky
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Scroll event handler to show/hide menu based on scroll direction and stickiness
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Check if the scroll position is greater than 100px to mark the menu as sticky
    setIsSticky(currentScrollY > 100);

    if (currentScrollY > lastScrollY) {
      // If scrolling down, hide the menu
      setShowMenu(false);
    } else {
      // If scrolling up, show the menu
      setShowMenu(true);
    }

    setLastScrollY(currentScrollY);
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener on unmount
    };
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-transform duration-500 ease-in-out ${showMenu ? 'translate-y-0' : '-translate-y-full'
          } ${isSticky || !isHomePage ? 'bg-gold' : 'bg-gold xl:bg-transparent'}`}
      >
        {/* Render TopMenu if topMenuItems are provided */}
        {topMenuItems && <TopMenu items={topMenuItems} />}

        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section for Mobile */}
            <div className="flex items-center flex-shrink-0 xl:hidden">
              <Logo
                src="https://erepros.com/wp-content/uploads/2024/08/REAL-ESTATE-full-white-1.png"
                alt="Elite Real Estate"
              />
            </div>

            {/* Desktop Menu */}
            {isHomePage ? (
              <div className="hidden xl:flex flex-1 items-center justify-center">
                {/* Left Links */}
                <div className="flex flex-1 justify-end space-x-5 items-center">
                  {children.slice(0, Math.ceil(children.length / 2))}
                </div>

                {/* Logo Section for Desktop */}
                <div className="flex justify-center items-center flex-shrink-0 mx-12">
                  <Logo
                    src="https://erepros.com/wp-content/uploads/2024/08/REAL-ESTATE-full-white-1.png"
                    alt="Elite Real Estate"
                  />
                </div>

                {/* Right Links */}
                <div className="flex flex-1 justify-start space-x-5 items-center">
                  {children.slice(Math.ceil(children.length / 2))}
                </div>
              </div>
            ) : (
              <div className="hidden xl:flex flex-1 items-center justify-between">
                {/* Logo on the Left */}
                <div className="flex items-center flex-shrink-0">
                  <Logo
                    src="https://erepros.com/wp-content/uploads/2024/08/REAL-ESTATE-full-white-1.png"
                    alt="Elite Real Estate"
                  />
                </div>

                {/* Centered Menu Links */}
                <div className="flex space-x-5 items-center justify-center flex-grow">
                  {children}
                </div>
              </div>
            )}

            <div className="absolute right-24 top-[85px] transform -translate-y-1/2 hidden xl:flex items-center justify-center">
              <button className="bg-white text-gold border-2 border-gold rounded-lg px-8 py-8 font-semibold text-center hover:shadow-lg hover:border-pampas hover:bg-gold hover:text-white transition flex flex-col items-center justify-center h-12 w-auto text-sm">
                <p>REGISTER</p>
                <p>INTEREST</p>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden">
              <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation (All items) */}
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} topMenuItems={topMenuItems}>
          {children}
        </MobileMenu>
      </nav>
    </>
  );
};

