// components/Header.tsx
import { Menu, MenuItem } from "../ui/navbar"; // Adjust the import path accordingly

export default function Header() {
    const topMenuItems = [
        {
            label: 'Tenant',
            subItems: [
                { href: '/top-menu-item1', label: 'Top Menu Item 1' },
                { href: '/top-menu-item2', label: 'Top Menu Item 2' },
                { href: '/top-menu-item1', label: 'Top Menu Item 1' },
                { href: '/top-menu-item2', label: 'Top Menu Item 2' },
            ],
        },
        {
            label: 'Owner',
            subItems: [
                { href: '/top-menu-item1', label: 'Top Menu Item 1' },
                { href: '/top-menu-item2', label: 'Top Menu Item 2' },
            ],
        },
        {
            label: 'HOA',
            subItems: [
                { href: '/top-menu-item1', label: 'Top Menu Item 1' },
                { href: '/top-menu-item2', label: 'Top Menu Item 2' },
            ],
        },
        // Add more top menu items if needed
    ];

    return (
        <Menu topMenuItems={topMenuItems}>
            <MenuItem href="/" label="Home Listings" />
            <MenuItem
                label="Available Rentals"
                subItems={[
                    { href: "/available-rentals", label: "Apartment/House" },
                    { href: "/storage-unit", label: "Storage Unit" },
                ]}
            />
            <MenuItem
                label="Who We Are"
                subItems={[
                    { href: "/about-us", label: "About Us" },
                    { href: "/team", label: "Team" },
                ]}
            />
            <MenuItem
                label="What We Do"
                subItems={[
                    {
                        label: "HOA Management",
                        nestedSubItems: [
                            { href: "/overview", label: "Overview" },
                            { href: "/pricing", label: "Pricing" },
                        ],
                    },
                    { href: "/reso-property", label: "Real Estate" },
                ]}
            />
            <MenuItem
                label="Resources"
                subItems={[
                    { href: "/mortgage-calculator", label: "Mortgage Calculator" },
                    { href: "", label: "Free Home Evaluation" },
                ]}
            />
            <MenuItem href="/contact-us" label="Contact Us" />
        </Menu>
    );
}
