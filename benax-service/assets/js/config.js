/* Configuration du site Benax Service.
   Aucun secret ici : seulement des liens publics. */
window.CAEMENTUM = {
  // Courriel de contact affiché et utilisé en secours si le formulaire est indisponible.
  email: "Ajnetpro@gmail.com",

  // Réservation d'appel (Calendly, Cal.com, etc.). Laisser vide pour renvoyer vers le formulaire de contact.
  bookingUrl: "",

  // Formulaires : "/" convient à Netlify Forms. Pour un autre service, indiquer son URL.
  formEndpoint: "/",

  // Liens de paiement Stripe (Payment Links), un par programme et par durée.
  // Laisser vide tant que Stripe n'est pas configuré : la demande est alors envoyée à Alexandre.
  checkout: {
    piste: { monthly: "", six: "", year: "" },
    route: { monthly: "", six: "", year: "" },
    trail: { monthly: "", six: "", year: "" },
    squad: { monthly: "", six: "", year: "" }
  }
};
