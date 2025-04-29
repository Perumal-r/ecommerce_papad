import { useEffect } from "react";
import { GiProgression } from "react-icons/gi";
import { BsPersonHeart } from "react-icons/bs";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { FaCalendarCheck } from "react-icons/fa";

const Counter = () => {
  useEffect(() => {
    const counters = document.querySelectorAll(".timer");

    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +(counter.getAttribute("data-to") || 0);
        const speed = +(counter.getAttribute("data-speed") || "1000");
        const increment = target / (speed / 16);
        let count = 0;

        const animate = () => {
          count += increment;
          if (count < target) {
            counter.textContent = Math.ceil(count).toString();
            requestAnimationFrame(animate);
          } else {
            counter.textContent = target.toString();
          }
        };

        animate();
      };

      updateCount();
    });
  }, []);

  const counters = [
    {
      icon: <GiProgression />,
      to: 10,
      speed: 7000,
      title: "Production Progress",
    },
    {
      icon: <BsPersonHeart />,
      to: 100,
      speed: 7000,
      title: "Happy Clients",
    },
    {
      icon: <CgArrowsExpandUpRight />,
      to: 5,
      speed: 7000,
      title: "Projects Completed",
    },
    {
      icon: <FaCalendarCheck />,
      to: 35,
      speed: 7000,
      title: "Total Years",
    },
  ];

  return (
    <div>
      <section
        className="wow fadeIn animated"
        data-aos="fade-down"
        style={{ visibility: "visible", animationName: "fadeIn" }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-30">
            {counters.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-green-50 text-black p-6 rounded-2xl shadow-lg"
                data-wow-duration={`${(index + 1) * 300}ms`}
                style={{
                  visibility: "visible",
                  animationDuration: `${(index + 1) * 300}ms`,
                  animationName: "fadeInUp",
                }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <span
                  className="timer text-3xl font-bold"
                  data-to={item.to}
                  data-speed={item.speed}
                >
                  {item.to}
                </span>
                <p className="mt-2 text-lg font-medium text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Counter;
