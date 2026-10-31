import React from "react";
import Image from "next/image";
import Logo from "../../assets/logo-icon.png";
const banglaDate = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  calendar: "gregory",
  timeZone: "Asia/Dhaka",
}).format(new Date());

const Navbar = () => {
  return (
    <div className="flex gap-2 items-center justify-between pt-2 px-30">
      <div className="flex gap-2">
        <div className="bg-green-600 rounded-2xl w-12 h-12 flex items-center justify-center shrink-0">
          <Image
            src={Logo}
            alt="Logo of Website"
            width={18}
            height={18}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-black">বাজার দর</h1>
          <p className="text-sm font-normal">{banglaDate}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button>সাইন ইন</button>
        <button className="btn bg-green-700 shadow-lg shadow-green-500/40 text-white border-none">
          সাইন আপ
        </button>
      </div>
    </div>
  );
};

export default Navbar;
