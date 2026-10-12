import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const name = "Oliver Cox";
export const tagline = "Software engineer. Backend, web, mobile and games.";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export type ContactLink = { name: string; href: string; icon: IconType };

export const links: ContactLink[] = [
  { name: "GitHub", href: "https://github.com/coxy0", icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/oli-cox/", icon: FaLinkedin },
  { name: "Email", href: "mailto:olicox05@gmail.com", icon: MdEmail },
];
