import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ExternalLink, BookOpen } from 'lucide-react';
import { MAYO } from '@/lib/mayo-images';

const EASE = [0.16, 1, 0.3, 1] as const;

const magazines = [
  {
    title: 'Francomania 2025',
    edition: 'Volume V',
    description: 'The latest edition featuring student essays, poetry, artwork, and highlights from the XIVth Edition of LCF du Mayo.',
    pdf: '/francomania-2025.pdf',
    cover: '/francomania-2025-cover.png',
    coverHover: '/francomania-2025-cover.png',
    year: 2025,
  },
  {
    title: 'Francomania 2024',
    edition: 'Volume IV',
    description: 'The annual French language magazine featuring student essays, poetry, artwork, and highlights from the XIIIth Edition of LCF du Mayo.',
    pdf: '/francomania-2024.pdf',
    cover: 'https://static.wixstatic.com/media/043b85_97ac8cdb2e5d481ab91a69097ef5f9bc~mv2.jpg',
    coverHover: 'https://static.wixstatic.com/media/043b85_8e92aac48a9b47a1b47aaf010a59b5c6~mv2.jpg',
    year: 2024,
  },
  {
    title: 'Francomania 2023',
    edition: 'Volume IV',
    description: 'A vibrant collection of student contributions in French — poems, stories, cultural essays, and photographic memories from the XIIth Edition.',
    pdf: '/francomania-2023.pdf',
    cover: 'https://static.wixstatic.com/media/656b1f_db7542d505e34f3b9fa90d8a5c7ad54f~mv2.jpg',
    coverHover: 'https://static.wixstatic.com/media/656b1f_0df90da6576040eba9b9d3247acc14b4~mv2.png',
    year: 2023,
  },
  {
    title: 'Francomania 2022',
    edition: 'Volume III',
    description: 'The special anniversary edition celebrating 10 years of LCF du Mayo with retrospective articles and student reflections.',
    pdf: '/francomania-2022.pdf',
    cover: 'https://static.wixstatic.com/media/043b85_b1b748832cca493cb678c81755b166ba~mv2.png',
    coverHover: 'https://static.wixstatic.com/media/043b85_6a923c5d1e22450899aeb3e9f01e5b8e~mv2.png',
    year: 2022,
  },
  {
    title: 'Francomania 2019',
    edition: 'Volume II',
    description: 'Student essays, poetry, and cultural explorations from the IXth Edition of Le Concours de la Francophonie du Mayo.',
    pdf: '/francomania-2019.pdf',
    cover: 'https://static.wixstatic.com/media/043b85_1c9cbdcd63ef4faf8214131ffbd67ad2~mv2.jpg',
    coverHover: 'https://static.wixstatic.com/media/043b85_551aa7a566bf42a4aab59b8d2bb4e155~mv2.jpg',
    year: 2019,
  },
  {
    title: 'Francomania 2018',
    edition: 'Volume I',
    description: 'The inaugural edition of Francomania — marking the beginning of a new tradition in Francophone publishing at Mayo College.',
    pdf: '/francomania-2018.pdf',
    cover: 'https://static.wixstatic.com/media/043b85_f586c555a45240bebf02c356ab15ea58~mv2.png',
    coverHover: 'https://static.wixstatic.com/media/043b85_49e90f2966eb4e38949af53d9678d642~mv2.png',
    year: 2018,
  },
];

export default function Francomania() {
  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-width architectural background
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-end">
        <img
          src={MAYO.editorial3}
          alt="Francomania Magazine"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.6)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,7,11,0.85) 0%, rgba(5,7,11,0.3) 50%, rgba(5,7,11,0.85) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/40" />

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              Publication
            </span>
            <h1 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              Francomania <br />
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Magazine</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A94AC] max-w-xl leading-relaxed font-body">
              Our annual student magazine celebrating French language and Francophone culture through essays, poetry, artwork, and event highlights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT THE MAGAZINE ═══ */}
      <section className="py-16 md:py-20 border-t border-white/[0.04]">
        <div className="container px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="bg-[#09111F]/50 border border-white/[0.04] p-8 md:p-14 max-w-4xl backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.04] flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-[#2A5A9A]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-white text-lg tracking-tight mb-4 uppercase">
                  About Francomania
                </h3>
                <p className="text-xs md:text-sm text-[#7A94AC] leading-relaxed mb-4 font-body">
                  Francomania is the official annual publication of Le Concours de la Francophonie du Mayo. Each edition brings together the best of student creativity — original French-language essays, poems, short stories, cultural explorations, and artwork — alongside a photographic record of the year's competition.
                </p>
                <p className="text-[11px] text-[#4A6A8A]/60 leading-relaxed font-body">
                  The magazine serves as a lasting testament to the talent and passion of young Francophiles across India, and a beautiful keepsake for all participants, teachers, and French language enthusiasts.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══ MAGAZINE LIST ═══ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute -top-16 -left-16 select-none pointer-events-none font-heading font-extrabold tracking-tight text-white/[0.015] uppercase leading-none" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          ARCHIVES
        </div>

        <div className="container px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12"
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-4">
              Archives
            </span>
            <h2 className="text-white normal-case font-heading font-extrabold uppercase tracking-tight text-xl md:text-2xl">
              Past Editions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {magazines.map((mag, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.4, ease: EASE, delay: idx * 0.05 }}
                className="h-full"
              >
                <a
                  href={mag.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  {/* Cover Image */}
                  <div className="relative overflow-hidden border border-white/[0.04] bg-[#09111F]/50 mb-4 aspect-[3/4]">
                    {mag.cover ? (
                      <>
                        <img
                          src={mag.cover}
                          alt={mag.title}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                          style={{ filter: 'brightness(0.85) saturate(0.85)' }}
                          loading="lazy"
                        />
                        <img
                          src={mag.coverHover}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
                          style={{ filter: 'brightness(0.9) saturate(0.9)' }}
                          loading="lazy"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0B1220] to-[#05070B]">
                        <div className="font-heading italic text-white/10 text-4xl md:text-5xl mb-2">LCF</div>
                        <div className="text-[10px] font-heading tracking-[0.2em] text-[#2A5A9A]/50 uppercase font-bold">du Mayo</div>
                        <div className="w-8 h-[1px] bg-[#2A5A9A]/20 my-3" />
                        <div className="text-[9px] font-heading tracking-[0.15em] text-[#4A6A8A]/50 uppercase font-bold">{mag.year}</div>
                      </div>
                    )}
                    {/* Year badge */}
                    <div className="absolute top-3 left-3 bg-[#05070B]/80 backdrop-blur-sm border border-white/[0.08] px-3 py-1.5">
                      <span className="text-[9px] font-heading font-bold tracking-[0.15em] uppercase text-[#7AA8D4]">{mag.year}</span>
                    </div>
                    {/* Open indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-[#05070B]/80 backdrop-blur-sm border border-white/[0.1] px-3 py-1.5 flex items-center gap-1.5">
                        <ExternalLink size={10} className="text-[#7AA8D4]" />
                        <span className="text-[8px] font-heading font-bold tracking-[0.15em] uppercase text-white/70">PDF</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm tracking-tight mb-1 group-hover:text-[#7AA8D4] transition-colors">
                      {mag.title}
                    </h3>
                    <div className="text-[8px] font-heading tracking-[0.2em] text-[#4A6A8A] uppercase mb-2 font-bold">
                      {mag.edition}
                    </div>
                    <p className="text-[11px] text-[#4A6A8A]/70 leading-relaxed font-body line-clamp-2">
                      {mag.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
