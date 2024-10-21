import { Menu, MenuItem } from "../ui/navbar"; // Adjust the import path accordingly

export default function Header() {
    return (
        <Menu>
            <MenuItem href="/" label="Home Listings" />
            <MenuItem
                label="Available Rentals" // Removed href since it has subItems
                subItems={[
                    { href: "/available-rentals", label: "Apartment/House" },
                    { href: "/storage-unit", label: "Storage Unit" },
                ]}
            />
            <MenuItem
                label="Who We Are" // Removed href since it has subItems
                subItems={[
                    { href: "/about-us", label: "About Us" },
                    { href: "/team", label: "Team" },
                ]}
            />
            <MenuItem
                label="What We Do" // Removed href since it has subItems
                subItems={[
                    {
                        label: "HOA Management",
                        nestedSubItems: [
                            { href: "/overview", label: "Overview" },
                            { href: "/pricing", label: "Pricing" },
                        ]
                    },
                    { href: "/reso-property", label: "Real Estate" },
                ]}
            />
            <MenuItem
                label="Resources" // Removed href since it has subItems
                subItems={[
                    { href: "/mortgage-calculator", label: "Mortgage Calculator" },
                    { href: "", label: "Free Home Evaluation" },
                ]}
            />
            <MenuItem href="/contact-us" label="Contact Us" />
        </Menu>
    );
}
