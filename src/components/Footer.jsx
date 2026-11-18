import { NavLink } from "react-router-dom";

const shopLink = [
  { name: "New Arrivals", to: "new-arrivals" },
  { name: "Electronics", to: "/electronics" },
  { name: "Fashion", to: "/fashion" },
  { name: "Home & Living", to: "/home" },
  { name: "Beauty & Care", to: "/beauty" },
];

const helpLink = [
  { name: "Order Tracking", to: "/" },
  { name: "Shipping Info", to: "/" },
  { name: "Size Guide", to: "/" },
  { name: "Returns & Exchange", to: "/" },
  { name: "Contact Us", to: "/" },
];

const companyLink = [
  { name: "About Us", to: "/" },
  { name: "Careers", to: "/" },
  { name: "Press", to: "/" },
  { name: "Affiliate Programs", to: "/" },
];

const legalLink = [
  { name: "Privacy Policy", to: "/" },
  { name: "Terms of Service", to: "/" },
  { name: "Cookie Policy", to: "/" },
  { name: "Accessibility", to: "/" },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-charcoal px-5 py-8">
      <div className="grid grid-cols-1 text-muted-grey md:grid-cols-4 gap-8 lg:grid-cols-5">
        {/* logo */}
        <div className="flex flex-col gap-3">
          <div>
            <NavLink to="/">
              <p className="text-lg font-bold text-white">
                <span className="text-electric-blue">Shop</span>Ease
              </p>
            </NavLink>
          </div>
          <p className="text-muted-grey text-sm ">
            The smarter way to shop. Thousands of products, hundreds of brands,
            one seamless experience.
          </p>
        </div>

        {/* shop */}
        <div className="flex flex-col gap-3 text-sm">
            <p className="font-bold text-white">SHOP</p>
            {shopLink.map((shop)=>(
                <NavLink to={shop.to} key={shop.id} className="hover:text-electric-blue" >
                    {shop.name}
                </NavLink>
            ))}
        </div>

         {/* help */}
        <div className="flex flex-col gap-3 text-sm">
            <p className="font-bold text-white">HELP</p>
            {helpLink.map((help)=>(
                <NavLink to={help.to} key={help.id} className="hover:text-electric-blue" >
                    {help.name}
                </NavLink>
            ))}
        </div>

         {/* COMPANY */}
        <div className="flex flex-col gap-3 text-sm">
            <p className="font-bold text-white">COMPANY</p>
            {companyLink.map((company)=>(
                <NavLink to={company.to} key={company.id} className="hover:text-electric-blue" >
                    {company.name}
                </NavLink>
            ))}
        </div>

         {/* shop */}
        <div className="flex flex-col gap-3 text-sm">
            <p className="font-bold text-white">LEGAL</p>
            {legalLink.map((legal)=>(
                <NavLink to={legal.to} key={legal.id} className="hover:text-electric-blue" >
                    {legal.name}
                </NavLink>
            ))}
        </div>

      </div>
       <div className="border-t-[0.1px] border-muted-grey mt-6 py-4">
            <p className="text-muted-grey text-xs">&copy; {currentYear} ShopEase, Inc. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
