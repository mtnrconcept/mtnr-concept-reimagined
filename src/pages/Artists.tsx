
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import ParallaxBackground from "@/components/ParallaxBackground";
import NeonText from "@/components/effects/NeonText";
import ElectricParticles from "@/components/effects/ElectricParticles";
import UVText from "@/components/effects/UVText";

const artists = [{
  name: "U.D Sensei",
  img: "/lovable-uploads/211284ce-8851-4248-8f65-0ea7e3c0c8ff.png",
  desc: "Producteur maudit, MC, boss du son MTNR. Beat sale, vision claire."
}, {
  name: "Mairo",
  img: "/lovable-uploads/5688334d-9fa2-4439-9453-5a5b9cde0c81.png",
  desc: "Ruff lyricist, cracheur de feu, rimes brutales sur instrus obscures."
}, {
  name: "Aray",
  img: "/lovable-uploads/62a9a9d9-c7b1-4cce-b401-180c42e9a514.png",
  desc: "Rappeur, groove noir, punchlines crasses, flow toujours under."
}, {
  name: "Neverzed",
  img: "/lovable-uploads/07c10d93-651e-4ab2-a2d1-66268cbb231b.png",
  desc: "L'ombre du mic, plume acide, chronique la ruelle."
}];

export default function Artists() {
  // Force scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ParallaxBackground>
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <main className="min-h-screen w-full flex flex-col items-center pt-20 xs:pt-24 md:pt-32 px-3 xs:px-6 font-grunge selection:bg-primary selection:text-black">
          <div className="w-full max-w-5xl">
            <div className="px-[240px] mx-[83px]">
              <NeonText text="Le Crew" className="text-3xl xs:text-4xl md:text-6xl mb-5 xs:mb-8 uppercase text-center" color="yellow" flicker={true} />
              <ElectricParticles targetSelector=".neon-text" color="#ffdd00" quantity={15} />
            </div>
            
            <div className="text-base xs:text-lg md:text-xl font-grunge text-gray-100 mb-7 xs:mb-10 text-center max-w-3xl mx-auto drop-shadow-md" style={{
            letterSpacing: "0.06em"
          }}>
              <UVText 
                text="Celles et ceux qui bâtissent la légende MTNR. Un collectif, des styles, une vision crue et toujours underground."
                hiddenText="MTNR - L'ÉLITE DE L'UNDERGROUND - NOUS SOMMES LES FANTÔMES DE LA SCÈNE - LA VIBE QUI RÉSISTE"
                uvColor="#9b87f5"
                textSize="text-base xs:text-lg md:text-xl"
                position="default"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xs:gap-7 w-full pb-16">
              {artists.map(a => <div key={a.name} className="bg-black/80 paper-texture border-2 border-yellow-400/25 rounded-xl shadow-2xl flex flex-col items-center p-4 xs:p-6 transition-transform hover:scale-105 hover:shadow-yellow-400/20 hover:shadow-xl">
                  <div className="w-full overflow-hidden rounded-lg shadow-lg">
                    <img src={a.img} alt={a.name} className="w-full aspect-square object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-300 scale-100 hover:scale-105" />
                  </div>
                  <div className="mt-4 font-black text-lg xs:text-xl text-yellow-400 uppercase text-center tracking-wide">{a.name}</div>
                  <div className="text-xs xs:text-sm text-gray-300 italic mt-2 text-center">
                    <UVText 
                      text={a.desc}
                      hiddenText="MTNR ALCHIMISTE - SECRET KEEPER - GARDIEN DE LA VIBE"
                      uvColor="#D946EF"
                      textSize="text-xs xs:text-sm"
                      opacity={0.01}
                    />
                  </div>
                </div>)}
            </div>
          </div>
        </main>
      </div>
    </ParallaxBackground>;
}
