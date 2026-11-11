import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { birthday } from "@/content/birthday";
import { useMusic, type Track } from "@/hooks/use-background-music";
import { Playlist } from "@/components/birthday/Playlist";
import { MusicPreferenceModal } from "@/components/birthday/MusicPreferenceModal";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { HeroSection } from "@/components/birthday/HeroSection";
import { AboutSection } from "@/components/birthday/AboutSection";
import { PhotoGallery } from "@/components/birthday/PhotoGallery";
import { VideoMemory } from "@/components/birthday/VideoMemory";
import { MemoryCards } from "@/components/birthday/MemoryCards";
import { BirthdayLetter } from "@/components/birthday/BirthdayLetter";
import { FinalWish } from "@/components/birthday/FinalWish";
import { SectionNav } from "@/components/birthday/SectionNav";
import { Confetti } from "@/components/birthday/Confetti";

const TITLE = "A Blooming Day for You — Happy Birthday";
const DESCRIPTION =
  "A personal birthday celebration in pink lilies: photos, memories, a video and a letter made just for you.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: BirthdayPage,
});

/** Remembered for this browser tab so the question isn't asked again on reload. */
const CHOICE_KEY = "blooming-day:music-choice";

const BACKGROUND_TRACK: Track = {
  id: "background",
  src: birthday.music.src,
  title: birthday.music.title,
};
const PLAYLIST_TRACKS: Track[] = birthday.playlist.songs.map((s, i) => ({
  id: `song-${i + 1}`,
  src: s.src,
  title: s.title,
  artist: s.artist,
}));

function BirthdayPage() {
  const music = useMusic(BACKGROUND_TRACK, PLAYLIST_TRACKS);
  const [modalOpen, setModalOpen] = useState(true);
  const [confetti, setConfetti] = useState(0);
  const celebrated = useRef(false);
  const { enableControls } = music;

  useEffect(() => {
    const stored = window.sessionStorage.getItem(CHOICE_KEY);
    if (stored === "yes" || stored === "no") {
      setModalOpen(false);
      // Returning in the same tab: show controls but never autoplay.
      if (stored === "yes") enableControls();
    }
  }, [enableControls]);

  const handleChoice = (withMusic: boolean) => {
    window.sessionStorage.setItem(CHOICE_KEY, withMusic ? "yes" : "no");
    setModalOpen(false);
    if (withMusic) void music.play();
  };

  const handleExplore = () => {
    setConfetti((n) => n + 1);
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCelebrate = useCallback(() => {
    if (celebrated.current) return;
    celebrated.current = true;
    setConfetti((n) => n + 1);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <MusicPreferenceModal open={modalOpen} content={birthday.musicModal} onChoose={handleChoice} />

      <main>
        <HeroSection
          content={birthday.hero}
          nickname={birthday.recipient.nickname}
          petName={birthday.recipient.petName}
          ready={!modalOpen}
          onExplore={handleExplore}
        />
        <AboutSection
          content={birthday.about}
          photo={birthday.recipient.profilePhoto}
          photoAlt={birthday.recipient.profilePhotoAlt}
        />
        <PhotoGallery content={birthday.gallery} />
        <VideoMemory content={birthday.video} onPlay={music.pause} />
        <MemoryCards content={birthday.memories} />
        <Playlist content={birthday.playlist} tracks={PLAYLIST_TRACKS} music={music} />
        <BirthdayLetter content={birthday.letter} from={birthday.from} />
        <FinalWish
          content={birthday.finalWish}
          footer={birthday.footer}
          onCelebrate={handleCelebrate}
        />
      </main>

      {!modalOpen && <SectionNav />}
      <MusicPlayer
        visible={music.enabled && !modalOpen}
        playing={music.playing}
        muted={music.muted}
        title={music.current.title}
        onToggle={music.toggle}
        onToggleMute={music.toggleMute}
      />
      <Confetti trigger={confetti} />
    </MotionConfig>
  );
}
