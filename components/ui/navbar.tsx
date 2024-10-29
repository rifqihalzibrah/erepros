"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

// MenuItem Component
export const MenuItem: React.FC<MenuItemProps> = ({
  href,
  label,
  subItems,
  mobile,
}) => {
  const [isOpenSubItems, setIsOpenSubItems] = useState(false); // Separate state for sub-items
  const [openNestedSubItemIndex, setOpenNestedSubItemIndex] = useState<
    number | null
  >(null); // State for nested sub-items
  const hasSubItems = subItems && subItems.length > 0;

  const handleToggleSubItems = () => {
    if (hasSubItems) {
      setIsOpenSubItems(!isOpenSubItems);
    }
  };

  // Toggle nested sub-items for specific index
  const handleToggleNestedSubItems = (index: number) => {
    setOpenNestedSubItemIndex(openNestedSubItemIndex === index ? null : index);
  };

  const renderNestedSubItems = (
    nestedSubItems: NestedSubItem[],
    nestedIndex: number
  ) => {
    return (
      <div
        className={`pl-6 ${
          openNestedSubItemIndex === nestedIndex ? "block" : "hidden"
        }`}
      >
        {nestedSubItems.map((nestedItem, idx) => (
          <Link
            key={idx}
            href={nestedItem.href}
            className="block px-3 py-2 rounded-md text-base font-medium text-white font-marcellus"
          >
            {nestedItem.label}
          </Link>
        ))}
      </div>
    );
  };

  const renderSubItems = () => {
    return subItems?.map((item, idx) => {
      const hasNestedSubItems =
        item.nestedSubItems && item.nestedSubItems.length > 0;

      return (
        <div key={idx}>
          {hasNestedSubItems ? (
            <div>
              <button
                className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-white font-marcellus focus:outline-none"
                onClick={() => handleToggleNestedSubItems(idx)}
              >
                {/* Label and arrow positioned in flex container */}
                <span>{item.label}</span>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-200 ml-2 ${
                    openNestedSubItemIndex === idx ? "rotate-180" : ""
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
              href={item.href || "#"}
              className="block px-3 py-2 rounded-md text-base font-medium text-white font-marcellus"
            >
              {item.label}
            </Link>
          )}
        </div>
      );
    });
  };

  if (mobile) {
    return (
      <div className="block text-base font-medium text-white">
        <div
          className="flex justify-between items-center px-3 py-2 rounded-md"
          onClick={handleToggleSubItems}
        >
          {hasSubItems ? (
            <button className="relative group text-left focus:outline-none font-marcellus">
              {label}
              <span className="block h-[1px] bg-white absolute left-0 bottom-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
            </button>
          ) : (
            <Link href={href || "#"} className="relative group font-marcellus">
              {label}
              <span className="block h-[1px] bg-white absolute left-0 bottom-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
            </Link>
          )}
          {hasSubItems && (
            <svg
              className={`h-4 w-4 transform transition-transform duration-200 ${
                isOpenSubItems ? "rotate-180" : ""
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
          )}
        </div>
        {hasSubItems && isOpenSubItems && (
          <div className="pl-6">{renderSubItems()}</div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      {hasSubItems ? (
        <div className="relative text-center">
          <button className="text-xs text-white uppercase tracking-widest pb-1 focus:outline-none">
            {label}
          </button>
          <span className="block h-[1px] bg-white absolute left-0 bottom-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
        </div>
      ) : (
        <div className="relative text-center">
          <Link
            href={href || "#"}
            className="text-xs text-white uppercase tracking-widest pb-1"
          >
            {label}
          </Link>
          <span className="block h-[1px] bg-white absolute left-0 bottom-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
        </div>
      )}
      {hasSubItems && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-6 w-60 bg-gold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 p-4">
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
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  children,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 xl:hidden" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 h-[calc(100vh_-_4rem)] bg-gold z-50 transform transition-transform duration-300 ease-in-out xl:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {children.map((child, idx) => (
            <div key={idx}>{React.cloneElement(child, { mobile: true })}</div>
          ))}
        </div>
      </div>
    </>
  );
};

// Menu Component
interface MenuProps {
  children: React.ReactElement<MenuItemProps>[];
}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <nav className="bg-gold shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 hidden xl:flex items-center justify-center">
            <button className="bg-white text-gold border-2 border-gold rounded-lg px-6 py-3 font-semibold text-center hover:bg-gold hover:text-white transition flex flex-col items-center justify-center h-12 w-auto text-sm">
              <span>REGISTER INTEREST</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden">
            <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation (All items) */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}>
        {children}
      </MobileMenu>
    </nav>
  );
};
