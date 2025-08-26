

const FeatureCard = ({ icon, alt, title, children }) => (
  <div className="feature-item">
    <img src={icon} alt={alt} className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{children}</p>
  </div>
);

export default FeatureCard;