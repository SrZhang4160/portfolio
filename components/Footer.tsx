import Link from "next/link";

const footerLinks = {
  explore: [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "3D Prints", href: "/prints" },
    { name: "Travel", href: "/travel" },
  ],
  connect: [
    { name: "Contact", href: "/contact" },
    { name: "Coffee Chat", href: "/coffee" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", external: true },
    { name: "LinkedIn", href: "https://linkedin.com", external: true },
    { name: "Twitter", href: "https://twitter.com", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F0] border-t border-[#E5E5E0]">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-[#1A1A1A]">Sharon Zhang</h3>
            <p className="text-[#6B6B60] text-sm">
              MechE turned Robotics Engineer, building at the intersection of
              AI and healthcare.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#8B8B80]">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#6B6B60] hover:text-[#1A1A1A] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#8B8B80]">
              Connect
            </h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#6B6B60] hover:text-[#1A1A1A] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#8B8B80]">
              Social
            </h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B6B60] hover:text-[#1A1A1A] transition-colors text-sm inline-flex items-center"
                  >
                    {link.name}
                    <svg
                      className="ml-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#E5E5E0]">
          <p className="text-[#8B8B80] text-sm text-center">
            &copy; {new Date().getFullYear()} Sharon Zhang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
