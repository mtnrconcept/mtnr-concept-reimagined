
import { useEffect, useCallback } from 'react';
import { useNavigation } from '@/components/effects/NavigationContext';

interface UseVideoTransitionEffectsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isFirstLoad: boolean;
  setIsFirstLoad: (value: boolean) => void;
  isTransitioning: boolean;
  hasUserInteraction: boolean;
  currentVideo: string;
  playVideoTransition: () => Promise<void>;
  handleUserInteraction: () => void;
  uvMode: boolean;
  isTorchActive: boolean | undefined;
}

export const useVideoTransitionEffects = ({
  videoRef,
  isFirstLoad,
  setIsFirstLoad,
  isTransitioning,
  hasUserInteraction,
  currentVideo,
  playVideoTransition,
  handleUserInteraction,
  uvMode,
  isTorchActive
}: UseVideoTransitionEffectsProps) => {
  const navigation = useNavigation();

  // Fonction qui exécute la transition si les conditions sont réunies
  const executeTransition = useCallback(() => {
    if (!hasUserInteraction) {
      handleUserInteraction();
      console.log('Première interaction, préparation de la transition vidéo');
      setTimeout(() => playVideoTransition(), 100);
    } else if (!isTransitioning) {
      console.log('Exécution de la transition vidéo');
      playVideoTransition();
    }
  }, [hasUserInteraction, isTransitioning, playVideoTransition, handleUserInteraction]);

  // Écouter les événements de navigation
  useEffect(() => {
    const unregister = navigation.registerVideoTransitionListener(() => {
      console.log("Transition vidéo déclenchée par navigation");
      executeTransition();
    });
    
    return unregister;
  }, [navigation, executeTransition]);
  
  // Initialisation et démarrage de la vidéo
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    // Configuration initiale
    if (isFirstLoad) {
      console.log("Premier chargement de la vidéo");
      
      const initializeVideo = async () => {
        // Configurer la vidéo
        videoElement.playsInline = true;
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.autoplay = true;
        
        // S'assurer que les sources sont correctement définies
        if (!videoElement.src && videoElement.getElementsByTagName('source').length === 0) {
          const source = document.createElement('source');
          source.src = currentVideo;
          source.type = 'video/mp4';
          videoElement.appendChild(source);
          videoElement.load();
        }
        
        try {
          // Tentative de lecture
          await videoElement.play();
          console.log("Lecture vidéo démarrée avec succès");
        } catch (error) {
          console.warn("Lecture automatique impossible, attente d'interaction:", error);
        }
      };
      
      initializeVideo();
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, videoRef, setIsFirstLoad, currentVideo]);
  
  // Ajout des écouteurs pour la première interaction utilisateur
  useEffect(() => {
    if (hasUserInteraction) return;
    
    const handleInteraction = () => {
      handleUserInteraction();
      
      // Tenter de jouer la vidéo après l'interaction
      if (videoRef.current) {
        videoRef.current.play().catch(err => 
          console.warn("Erreur lors de la lecture après interaction:", err)
        );
      }
    };
    
    // Ajouter les écouteurs d'événements
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });
    
    return () => {
      // Nettoyer les écouteurs
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [handleUserInteraction, hasUserInteraction, videoRef]);
  
  // Tentative de lecture automatique au chargement initial
  useEffect(() => {
    if (videoRef.current && isFirstLoad === false) {
      const autoplayAttempt = async () => {
        try {
          await videoRef.current?.play();
          console.log("Lecture vidéo automatique réussie");
        } catch (error) {
          console.warn("Lecture automatique échouée, attente d'interaction:", error);
        }
      };
      
      autoplayAttempt();
    }
  }, [videoRef, isFirstLoad]);
};
