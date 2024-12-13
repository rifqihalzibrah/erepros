// components/Header.tsx
import { Menu, MenuItem } from "../../ui/navbar"; // Adjust the import path accordingly

export default function Header() {
  const topMenuItems = [
    {
      label: "Tenant",
      subItems: [
        {
          href: "https://app.propertyware.com/pw/index.html#/login/tenant/eliteprofessionalmanagement",
          label: "Tenant Portal Login",
        },
        { href: "/available-rentals", label: "Apply Now" },
        { href: "/move-in-move-out", label: "Move In Move Out" },
        { href: "/tenant-faq", label: "Tenant FAQ" },
        { href: "/tenant-service-request", label: "Tenant Service Request" },
        {
          href: "/tenant/tenant-benefit-package",
          label: "Tenant Benefit Package",
        },
      ],
    },
    {
      label: "Owner",
      subItems: [
        {
          href: "https://app.propertyware.com/pw/index.html#/login/owner/eliteprofessionalmanagement",
          label: "Owner Portal",
        },
        { href: "/owner-faq", label: "Owner FAQ" },
      ],
    },
    {
      label: "HOA",
      subItems: [
        {
          href: "https://app.propertyware.com/pw/index.html#/login/tenant/eliteprofessionalmanagement",
          label: "Resident Portal Login HOA",
        },
        { href: "/hoa-resident-faq", label: "HOA Resident FAQ" },
        { href: "/hoa-homeowner-faq", label: "HOA Homeowner FAQ" },
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
            label: "Property Management",
            nestedSubItems: [
              { href: "/overview", label: "Overview" },
              { href: "/pricing", label: "Pricing" },
            ],
          },
          { href: "/hoa-management", label: "HOA Management" },
          { href: "/reso-property", label: "Real Estate" },
        ]}
      />
      <MenuItem
        label="Resources"
        subItems={[
          { href: "/mortgage-calculator", label: "Mortgage Calculator" },
          { href: "/free-home-evaluation", label: "Free Home Evaluation" },
        ]}
      />
      <MenuItem href="/contact-us" label="Contact Us" />
    </Menu>
  );
}
