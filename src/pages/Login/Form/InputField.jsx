import PropTypes from "prop-types";

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  required = false,
  wrapperClass = "input-wrapper",
}) => {
  return (
    <div className={wrapperClass}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
};

InputField.propTypes = {
    
    /** 
    * Identifiant unique pour l'input 
    * → sert aussi à lier le <label> via htmlFor
    */
    id: PropTypes.string.isRequired,

    /** 
    * Texte affiché dans le label du champ 
    */
    label: PropTypes.string.isRequired,

    /** 
    * Type de champ input 
    * (ex: "text", "password", "email"…) 
    * → par défaut : "text"
    */
    type: PropTypes.string,

    /** 
    * Valeur courante du champ 
    * → rend le composant contrôlé par React
    */
    value: PropTypes.string,

    /** 
    * Fonction déclenchée lors d'un changement de valeur 
    * (ex: onChange={(e) => setState(e.target.value)})
    */
    onChange: PropTypes.func,

    /** 
    * Attribut HTML autoComplete 
    * (ex: "username", "current-password") 
    */
    autoComplete: PropTypes.string,

    /** 
    * Indique si le champ est obligatoire (HTML5 required) 
    */
    required: PropTypes.bool,

    /** 
    * Classe CSS appliquée au conteneur du champ 
    * → par défaut "input-wrapper"
    */
    wrapperClass: PropTypes.string,
};


export default InputField;
