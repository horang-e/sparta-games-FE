import { useEffect, useState } from "react";

const Title = ({ category }: { category: string }) => {
  const [isScrollActive, setIsScrollActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsScrollActive(true);
      } else {
        setIsScrollActive(false);
      }
    });
  }, []);

  return (
    <section
      className={`sticky top-20 z-10 flex w-full pb-5 ${
        isScrollActive ? "justify-start items-center mb-[325px] h-[150px]" : "justify-center items-end h-[475px]"
      } ease-in-out duration-200 bg-cover`}
      style={{ backgroundImage: `url('/src/assets/category/${category}.jpg')` }}
    >
      <div className="font-DungGeunMo text-[64px] text-white">[{category}]</div>
    </section>
  );
};

export default Title;
