import LINKS from "@/constant/links";
import { IconBrandFacebook, IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

const socialLinks = [
  { Icon: IconBrandGithub, href: LINKS.github, label: "GitHub", color: "group-hover:text-white" },
  { Icon: IconBrandLinkedin, href: LINKS.linkedIn, label: "LinkedIn", color: "group-hover:text-[#0A66C2]" },
  { Icon: IconMail, href: LINKS.email, label: "Email", color: "group-hover:text-[#EA4335]" },
  { Icon: IconBrandFacebook, href: LINKS.facebook, label: "Facebook", color: "group-hover:text-[#1877F2]" },
];

export default socialLinks;
