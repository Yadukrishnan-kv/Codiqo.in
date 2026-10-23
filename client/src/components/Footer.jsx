import React from "react";
import { Mail } from "lucide-react";

export default function Footer({ settings, mainServices = [] }) {
  const { logoText, footerDescription, contactEmail } = settings

  return (
    <footer className="bg-background border-t border-border py-16 text-left">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Upper Footer: Links & Info */}
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          {/* Studio Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a
              href="#top"
              className="flex items-center gap-2 font-display font-black text-2xl tracking-tight text-foreground select-none"
            >
              {logoText}<span className="text-primary font-bold">.</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {footerDescription}
            </p>
          </div>

          {/* Services Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-display font-bold text-foreground text-base tracking-wide">
              Services
            </h4>
            <ul className="space-y-2.5 text-muted-foreground text-sm">
              {mainServices.map((service) => (
                <li key={service._id}>
                  <a
                    href="#services"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-display font-bold text-foreground text-base tracking-wide">
              Get in touch
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-300 break-all"
                >
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>{contactEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Footer: Legal Copyright */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
          <p className="cursor-default">
            &copy; {new Date().getFullYear()} {logoText}
            <span className="text-primary font-bold">.</span> All rights
            reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
