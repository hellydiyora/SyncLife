import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#F4F1EC] border-t border-[#736E67]/[0.08] py-8 flex items-center justify-center">
      <p className="text-[#736E67]/50 text-xs font-medium tracking-widest uppercase">
        &copy; {new Date().getFullYear()} SyncLife. Mindfully crafted.
      </p>
    </div>
  );
};

export default Footer;