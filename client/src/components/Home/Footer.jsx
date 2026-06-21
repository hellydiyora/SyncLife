import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#F4F1EC] dark:bg-[#1A1816] border-t border-[#736E67]/[0.08] dark:border-[#FAF8F5]/[0.06] py-8 flex items-center justify-center transition-colors duration-300">
      <p className="text-[#736E67]/50 dark:text-[#9E988E]/40 text-xs font-medium tracking-widest uppercase">
        &copy; {new Date().getFullYear()} SyncLife. Mindfully crafted.
      </p>
    </div>
  );
};

export default Footer;