
import { motion } from 'framer-motion';
import { HeaderWidget } from './components/HeaderWidget';
import { CountdownWidget } from './components/CountdownWidget';
import { PartyDetailsWidget } from './components/PartyDetailsWidget';
import { RequirementsWidget } from './components/RequirementsWidget';
import { RSVPWidget } from './components/RSVPWidget';
import { DetailsModalWidget } from './components/DetailsModalWidget';

function App() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <HeaderWidget />
      
      {/* Countdown Section */}
      <section className="py-20">
        <CountdownWidget />
      </section>
      
      {/* Party Details Section */}
      <section className="py-20">
        <PartyDetailsWidget />
      </section>
      
      {/* Requirements Section */}
      <section className="py-20">
        <RequirementsWidget />
      </section>
      
      {/* RSVP Section */}
      <section className="py-20">
        <RSVPWidget />
      </section>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full mb-8"></div>
          <p className="text-white/60 text-sm">
            © 2025 Despedida. Todos los derechos reservados.
          </p>
        </div>
      </motion.footer>
      
      {/* Modal */}
      <DetailsModalWidget />
    </div>
  );
}

export default App;
