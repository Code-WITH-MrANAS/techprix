import { Mail, ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.png';

const links = {
  company:    [{ label: 'Services',     href: '#services'      },
               { label: 'Portfolio',    href: '#projects'      },
               { label: 'About',        href: '#about'         },
               { label: 'Testimonials', href: '#testimonials'  },
               { label: 'Contact',      href: '#contact'       }],
  services:   [{ label: 'Web Development',    href: '#services' },
               { label: 'Mobile Apps',        href: '#services' },
               { label: 'Digital Marketing',  href: '#services' },
               { label: 'Brand & Design',     href: '#services' },
               { label: 'SEO Optimization',   href: '#services' },
               { label: '3D Web Experiences', href: '#services' }],
};

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const socials = [
  { Icon: TwitterIcon,  href: '#', label: 'Twitter'  },
  { Icon: LinkedinIcon, href: '#', label: 'LinkedIn'  },
  { Icon: GithubIcon,   href: '#', label: 'GitHub'    },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-bg-main border-t border-border-light pt-20 pb-8 relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-18 h-8 rounded-lg flex items-center justify-center shadow-md">
                <img src={logo} alt="Tp" />
              </div>
              <span className="text-xl font-black italic font-display gradient-text">TechPrix</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-5 max-w-xs">
              Premium digital agency crafting anti-gravity web experiences,
              strategic marketing, and unforgettable brand identities.
            </p>
            <a
              href="mailto:techprix5@gmail.com"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-200 group"
            >
              <Mail size={14} />
              techprix5@gmail.com
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="flex gap-3 mt-5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-border-light bg-bg-secondary flex items-center justify-center text-text-muted hover:text-primary hover:border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-text-main font-bold mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-3">
              {links.company.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-text-main font-bold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-3">
              {links.services.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div>
            <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl p-6 text-white shadow-[0_12px_40px_rgba(99,102,241,0.30)] relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
              <p className="font-bold text-base mb-2 relative z-10">Start a Project</p>
              <p className="text-white/75 text-xs leading-relaxed mb-4 relative z-10">
                Free consultation & proposal for qualified projects.
              </p>
              <a
                href="#contact"
                className="inline-block px-5 py-2 bg-white text-primary text-sm font-bold rounded-full hover:bg-indigo-50 transition-colors relative z-10"
              >
                Get In Touch →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-light text-xs">
            © {year} TechPrix. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-text-light text-xs">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</a>
            <span className="flex items-center gap-1">
             Founded by AN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
