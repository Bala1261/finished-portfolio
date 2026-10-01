import React from "react";
import Link from "next/link";
import { footer } from "./config";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-border px-4 py-6 sm:flex-row md:px-6 sm:justify-between">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {year} {config.author}. All rights reserved.
      </p>
      <SocialMediaButtons />
      <nav aria-label="Footer Navigation" className="flex items-center gap-2 sm:gap-4 z-10 flex-wrap justify-center">
        {footer.map((link, index) => {
          const { title, href } = link;

          return (
            <Link
              className="text-xs text-zinc-400 hover:text-white transition-colors"
              href={href}
              key={`l_${index}`}
            >
              <Button variant={"link"} className="text-zinc-400 hover:text-white text-xs px-2 sm:px-3">
                {title}
              </Button>
            </Link>
          );
        })}
        {config.resume && (
          <a
            href={config.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-white transition-colors px-2 sm:px-3 py-2"
          >
            Resume
          </a>
        )}
      </nav>
    </footer>
  );
}

export default Footer;
