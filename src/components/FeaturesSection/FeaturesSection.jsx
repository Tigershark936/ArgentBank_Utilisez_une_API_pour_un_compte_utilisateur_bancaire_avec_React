import FeatureCard from '../FeatureCard/FeatureCard';
import iconChat from "../../assets/img/icon-chat.png";
import iconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";

const features = [
  {
    icon: iconChat,
    alt: "Chat Icon",
    title: "You are our #1 priority",
    text:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    icon: iconMoney,
    alt: "Money Icon",
    title: "More savings means higher rates",
    text:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    icon: iconSecurity,
    alt: "Security Icon",
    title: "Security you can trust",
    text:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

const FeaturesSection = () => (
  <section className="features">
    <h2 className="sr-only">Features</h2>
    {features.map(({ icon, alt, title, text }) => (
      <FeatureCard key={title} icon={icon} alt={alt} title={title}>
        {text}
      </FeatureCard>
    ))}
  </section>
);

export default FeaturesSection;
