import Image from "next/image";
import ceo_image from "../app/images/ceo_image.png"
import manager_image from "../app/images/manger_image.png"
import developer_image from "../app/images/developer_image.png"

// components/NewArrivals.tsx
export default function NewArrivals() {
  const teamMembers = [
    {
      name: "RAMU N",
      role: "Founder & CEO",
      image: ceo_image, // replace with actual image path
    },
    {
      name: "RANJITH PANDI",
      role: "Manager & CTO",
      image: manager_image,
    },
    {
      name: "PERUMAL R",
      role: "DEVELOPER & DESIGNER",
      image: developer_image,
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
        OUR PASSIONATE TEAM MEMBER
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-12">
        Our essential member of our team with strong expertise in
        technology and project management. He consistently works with dedication
        and collaboration, contributing effectively to the team&apos;s success. His
        enthusiasm and cooperative nature make him a valuable asset to any
        project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-2 border-green-400 overflow-hidden mb-4">
              <Image
                width={500}
                height={500}
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
