import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Comment Anissa Cosmetics collecte, utilise et protège les données personnelles de ses clients.",
};

const SECTIONS = [
  {
    title: "1. Données collectées",
    body: "Lors de la création d'une commande, de l'inscription à la newsletter ou de l'envoi d'un message via le formulaire de contact, nous collectons les données que vous nous fournissez : nom, adresse email, adresse de livraison et contenu de votre message.",
  },
  {
    title: "2. Finalité du traitement",
    body: "Ces données sont utilisées pour traiter et livrer vos commandes, répondre à vos demandes, vous envoyer notre newsletter si vous y avez consenti, et améliorer la qualité de nos produits et services.",
  },
  {
    title: "3. Base légale",
    body: "Le traitement de vos données repose sur l'exécution du contrat de vente, votre consentement explicite pour la newsletter, ainsi que l'intérêt légitime d'Anissa Cosmetics à assurer le bon fonctionnement de son service client.",
  },
  {
    title: "4. Partage des données",
    body: "Vos données ne sont jamais vendues à des tiers. Elles peuvent être transmises à nos prestataires (transporteurs, plateforme de paiement) dans la seule mesure nécessaire à l'exécution de votre commande.",
  },
  {
    title: "5. Conservation",
    body: "Vos données sont conservées pendant la durée nécessaire aux finalités décrites ci-dessus, et au maximum pendant la durée imposée par nos obligations légales et comptables.",
  },
  {
    title: "6. Cookies",
    body: "Le site utilise des cookies strictement nécessaires à son fonctionnement (panier, préférences de navigation). Aucun cookie publicitaire tiers n'est déposé sans votre consentement préalable.",
  },
  {
    title: "7. Vos droits",
    body: "Conformément à la législation applicable, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données. Vous pouvez exercer ces droits à tout moment via notre formulaire de contact.",
  },
  {
    title: "8. Sécurité",
    body: "Anissa Cosmetics met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès, altération, divulgation ou destruction non autorisés.",
  },
];

export default function PolitiqueDeConfidentialitePage() {
  return (
    <ErrorBoundary>
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-[860px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-xs tracking-[0.2em] text-brown uppercase">
          Informations légales
        </div>
        <h1 className="mb-4 font-serif text-4xl font-semibold text-ink sm:text-5xl">
          Politique de Confidentialité
        </h1>
        <p className="mb-12 text-sm text-[#8a7c6c]">
          Dernière mise à jour : janvier 2026
        </p>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 font-serif text-xl font-semibold text-ink">
                {section.title}
              </h2>
              <p className="text-[15px] leading-relaxed text-[#5c5248]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
