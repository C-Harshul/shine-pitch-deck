import Slide from "@/components/Slide";

const team = [
  {
    photo: "/1756873360937.jpeg",
    name: "Harshul Chandrashekhar",
    role: "Product lead",
    text: "Software engineering background; leads product and bridges technical capabilities with market needs. Echo framework: rapid prototypes, user validation, technical requirements. MEM coursework in Pricing Strategy and Analytics.",
  },
  {
    photo: "/1742413688007.jpeg",
    name: "Manish Reddy",
    role: "Sales & client outreach",
    text: "Leads client acquisition and stakeholder engagement. Reached initial CPA stakeholders and guided pain-point discovery. Recognizes niche problems and leverages networks for rapid validation.",
  },
  {
    photo: "/1725953369695.jpeg",
    name: "Muhammad Aatiq",
    role: "Technical lead",
    text: "Builds production-ready solutions. Once demand is validated and requirements are clear, transforms prototypes into robust, scalable, client-deployable systems. Enterprise-grade reliability.",
  },
];

const TeamSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Team
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Numina <span className="text-primary">founding team</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Product strategy, sales & validation, and technical execution
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="feature-card p-6 flex flex-col h-full">
              <div className="w-28 h-28 mb-5 shrink-0 rounded-full overflow-hidden border border-border/50 bg-muted/30">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{member.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default TeamSlide;
