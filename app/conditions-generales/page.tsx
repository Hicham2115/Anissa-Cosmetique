import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Conditions Générales",
  description:
    "Conditions générales de vente et d'utilisation du site Anissa Cosmetics.",
};

const SECTIONS = [
  {
    title: "1. Objet",
    body: "Les présentes conditions générales régissent l'utilisation du site Anissa Cosmetics ainsi que toute commande passée auprès de la marque. En accédant au site et en passant commande, le client accepte sans réserve ces conditions.",
  },
  {
    title: "2. Produits",
    body: "Les produits proposés à la vente sont décrits et présentés avec la plus grande exactitude possible. Les photographies et illustrations ne sont toutefois pas contractuelles et de légères variations de teinte ou de packaging peuvent exister.",
  },
  {
    title: "3. Prix",
    body: "Les prix sont indiqués en dirhams marocains (MAD), toutes taxes comprises. Anissa Cosmetics se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant sur la commande au moment de sa validation est le seul applicable au client.",
  },
  {
    title: "4. Commande",
    body: "Toute commande passée sur le site suppose l'adhésion pleine et entière du client aux présentes conditions générales. La confirmation de la commande vaut acceptation des présentes conditions, des prix et de la description des produits disponibles à la vente.",
  },
  {
    title: "5. Livraison",
    body: "Les commandes sont livrées à l'adresse indiquée par le client lors de la commande, dans les délais communiqués au moment de la validation. Anissa Cosmetics ne saurait être tenue responsable des retards imputables au transporteur ou à des circonstances indépendantes de sa volonté.",
  },
  {
    title: "6. Retours et remboursements",
    body: "Les demandes de retour doivent être adressées via le formulaire de contact dans un délai de 14 jours suivant la réception de la commande. Les produits doivent être retournés non ouverts, non utilisés et dans leur emballage d'origine.",
  },
  {
    title: "7. Responsabilité",
    body: "Anissa Cosmetics ne saurait être tenue responsable des dommages résultant d'une utilisation des produits non conforme aux instructions figurant sur leur emballage ou notice.",
  },
  {
    title: "8. Droit applicable",
    body: "Les présentes conditions générales sont soumises au droit marocain. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux de Casablanca.",
  },
];

export default function ConditionsGeneralesPage() {
  return (
    <ErrorBoundary>
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-[860px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-xs tracking-[0.2em] text-brown uppercase">
          Informations légales
        </div>
        <h1 className="mb-4 font-serif text-4xl font-semibold text-ink sm:text-5xl">
          Conditions Générales
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
