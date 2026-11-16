
const Footer = () => {
  return (
    <footer className="w-full">
      <hr className="w-full border-t border-gray-300" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:gap-6 md:py-8 md:text-left lg:px-8">
        <p className="text-xs font-medium leading-relaxed text-gray-700 sm:text-sm">
          বাজার দর&mdash;প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-xs font-medium leading-relaxed text-gray-500 sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
