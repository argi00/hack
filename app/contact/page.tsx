export default function ContactPage() {
  return (
    <main className="section-baobab">
      {/* Hero Section */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            📞 Contactez-nous
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
            et vous accompagner dans votre parcours entrepreneurial.
          </p>
        </div>
      </section>

      {/* Informations de Contact */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Adresse */}
            <div className="p-8 bg-gradient-to-b from-[#F5EDE3] to-white rounded-2xl shadow-lg border-l-4 border-[#FF6600] hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-6">📍</div>
              <h3 className="text-2xl font-bold text-[#704214] mb-4">Notre Adresse</h3>
              <p className="text-gray-800 font-semibold mb-2">ISM - Incubateur</p>
              <p className="text-gray-700 mb-1">Pôle d'Innovation de Dakar</p>
              <p className="text-gray-700 mb-1">Rue ML-15, Point E</p>
              <p className="text-gray-700 mb-4">Dakar, Sénégal</p>
              <a
                href="https://maps.google.com/?q=Dakar+Point+E"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#FF6600] text-white font-bold rounded-lg hover:bg-[#E55A00] transition-colors mt-4"
              >
                📍 Voir sur la carte
              </a>
            </div>

            {/* Téléphone */}
            <div className="p-8 bg-gradient-to-b from-[#F5EDE3] to-white rounded-2xl shadow-lg border-l-4 border-[#FF6600] hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-6">☎️</div>
              <h3 className="text-2xl font-bold text-[#704214] mb-4">Téléphone</h3>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-800">Standard :</span>
                <br />
                <a href="tel:+221338202525" className="text-[#FF6600] hover:underline font-bold">
                  +221 33 820 25 25
                </a>
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-800">Support :</span>
                <br />
                <a href="tel:+221338202526" className="text-[#FF6600] hover:underline font-bold">
                  +221 33 820 25 26
                </a>
              </p>
              <p className="text-gray-600 text-sm mt-6 bg-green-50 p-3 rounded-lg">
                ✓ Disponible du Lundi au Vendredi<br />
                ⏰ 9h00 - 18h00 (GMT)
              </p>
            </div>

            {/* Email */}
            <div className="p-8 bg-gradient-to-b from-[#F5EDE3] to-white rounded-2xl shadow-lg border-l-4 border-[#FF6600] hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-6">✉️</div>
              <h3 className="text-2xl font-bold text-[#704214] mb-4">Email</h3>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-800">Contact général :</span>
                <br />
                <a href="mailto:contact@ismincubateur.sn" className="text-[#FF6600] hover:underline font-bold">
                  contact@ismincubateur.sn
                </a>
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-800">Support technique :</span>
                <br />
                <a href="mailto:support@ismincubateur.sn" className="text-[#FF6600] hover:underline font-bold">
                  support@ismincubateur.sn
                </a>
              </p>
              <p className="text-gray-600 text-sm mt-6 bg-blue-50 p-3 rounded-lg">
                📧 Réponse sous 24h<br />
                🚀 Service prioritaire disponible
              </p>
            </div>
          </div>

          {/* Horaires d'ouverture */}
          <div className="bg-gradient-to-r from-[#FF6600] to-[#E55A00] rounded-2xl p-12 text-white shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black mb-8 text-center">🕐 Horaires d'Ouverture</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">📅 Jours Ouvrables</h3>
                  <div className="space-y-3 text-lg">
                    <p className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="font-bold">09:00 - 18:00</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Samedi</span>
                      <span className="font-bold">09:00 - 13:00</span>
                    </p>
                    <p className="flex justify-between opacity-60">
                      <span>Dimanche</span>
                      <span className="font-bold">Fermé</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">⚡ Services</h3>
                  <ul className="space-y-3 text-lg">
                    <li>✓ Accueil sans rendez-vous</li>
                    <li>✓ Rendez-vous conseillé</li>
                    <li>✓ Ateliers et formations</li>
                    <li>✓ Coaching personnalisé</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-[#F5EDE3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              👥 Notre Équipe
            </h2>
            <p className="text-xl text-gray-700">
              Des experts passionnés pour vous accompagner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Membre 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4 text-center">👨‍💼</div>
              <h3 className="text-2xl font-bold text-[#704214] mb-2 text-center">
                Mamadou Diallo
              </h3>
              <p className="text-[#FF6600] font-semibold mb-4 text-center">
                Directeur Général
              </p>
              <p className="text-gray-700 text-center mb-6">
                Expert en entrepreneuriat avec 15 ans d'expérience dans l'accompagnement de startups
              </p>
              <div className="text-center">
                <a
                  href="mailto:mamadou@ismincubateur.sn"
                  className="inline-block px-6 py-3 bg-[#FF6600] text-white font-bold rounded-lg hover:bg-[#E55A00] transition-colors"
                >
                  ✉️ Contacter
                </a>
              </div>
            </div>

            {/* Membre 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4 text-center">👩‍💻</div>
              <h3 className="text-2xl font-bold text-[#704214] mb-2 text-center">
                Aïssatou Sow
              </h3>
              <p className="text-[#FF6600] font-semibold mb-4 text-center">
                Responsable Incubation
              </p>
              <p className="text-gray-700 text-center mb-6">
                Spécialiste en développement de projets et innovation technologique
              </p>
              <div className="text-center">
                <a
                  href="mailto:aissatou@ismincubateur.sn"
                  className="inline-block px-6 py-3 bg-[#FF6600] text-white font-bold rounded-lg hover:bg-[#E55A00] transition-colors"
                >
                  ✉️ Contacter
                </a>
              </div>
            </div>

            {/* Membre 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-6xl mb-4 text-center">👨‍🏫</div>
              <h3 className="text-2xl font-bold text-[#704214] mb-2 text-center">
                Ibrahima Ndiaye
              </h3>
              <p className="text-[#FF6600] font-semibold mb-4 text-center">
                Responsable Coaching
              </p>
              <p className="text-gray-700 text-center mb-6">
                Coach certifié et mentor de plus de 100 entrepreneurs à succès
              </p>
              <div className="text-center">
                <a
                  href="mailto:ibrahima@ismincubateur.sn"
                  className="inline-block px-6 py-3 bg-[#FF6600] text-white font-bold rounded-lg hover:bg-[#E55A00] transition-colors"
                >
                  ✉️ Contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Contact */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            ❓ Questions Fréquentes
          </h2>

          <div className="space-y-6">
            <div className="bg-[#F5EDE3] rounded-lg p-6 border-l-4 border-[#FF6600]">
              <h3 className="text-xl font-bold text-[#704214] mb-2">
                Comment prendre rendez-vous ?
              </h3>
              <p className="text-gray-700">
                Appelez-nous au +221 33 820 25 25 ou envoyez un email à contact@ismincubateur.sn. 
                Nous vous proposerons un créneau dans les 48h.
              </p>
            </div>

            <div className="bg-[#F5EDE3] rounded-lg p-6 border-l-4 border-[#FF6600]">
              <h3 className="text-xl font-bold text-[#704214] mb-2">
                Proposez-vous des consultations gratuites ?
              </h3>
              <p className="text-gray-700">
                Oui ! La première consultation est gratuite pour tous les entrepreneurs. 
                C'est l'occasion de présenter votre projet et de découvrir nos services.
              </p>
            </div>

            <div className="bg-[#F5EDE3] rounded-lg p-6 border-l-4 border-[#FF6600]">
              <h3 className="text-xl font-bold text-[#704214] mb-2">
                Puis-je visiter vos locaux ?
              </h3>
              <p className="text-gray-700">
                Absolument ! Nous organisons des portes ouvertes tous les jeudis de 14h à 17h. 
                Vous pouvez aussi prendre rendez-vous pour une visite personnalisée.
              </p>
            </div>

            <div className="bg-[#F5EDE3] rounded-lg p-6 border-l-4 border-[#FF6600]">
              <h3 className="text-xl font-bold text-[#704214] mb-2">
                Quel est le délai de réponse pour un email ?
              </h3>
              <p className="text-gray-700">
                Nous nous engageons à répondre à tous les emails sous 24h ouvrées. 
                Pour les urgences, privilégiez le contact téléphonique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#704214] to-[#FF6600] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            🚀 Prêt à Lancer Votre Projet ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous dès aujourd'hui et bénéficiez d'un accompagnement personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+221338202525"
              className="px-8 py-4 bg-white text-[#FF6600] font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              📞 Appelez-nous
            </a>
            <a
              href="mailto:contact@ismincubateur.sn"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#FF6600] transition-colors text-lg"
            >
              ✉️ Envoyez un Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
