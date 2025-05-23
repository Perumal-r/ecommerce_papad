import Hero from "../components/Hero";
import Features from "../components/Feature";
import NewArrivals from "../components/NewArrivals";
import Categories from "../components/Categories";
import HowItWorks from "@/components/HowItWorks";
import Contact from "./contact/page";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="categories-section">
        <Categories />
      </div>
      <HowItWorks />

      <Features />
      <NewArrivals />
      <Contact />
    </>
  );
}
