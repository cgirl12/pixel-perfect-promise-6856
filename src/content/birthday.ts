/**
 * ─────────────────────────────────────────────────────────────
 *  BIRTHDAY CONTENT — edit everything personal in this one file.
 * ─────────────────────────────────────────────────────────────
 *
 *  Anything wrapped in [SQUARE BRACKETS] is a placeholder to replace.
 *
 *  PHOTOS
 *   • Put image files in /public/photos/ (e.g. /public/photos/01.jpg)
 *     and set `src: "/photos/01.jpg"`, or paste any full image URL.
 *   • While `src` is empty, an elegant placeholder is shown instead.
 *
 *  VIDEO
 *   • A local file: put it in /public/video/ and set `src: "/video/memory.mp4"`.
 *   • A link: any direct .mp4/.webm URL, or a YouTube / Vimeo link.
 *   • `poster` is the thumbnail shown before playing (optional).
 *
 *  MUSIC
 *   • The default track is an original, royalty-free music-box tune made for
 *     this site. To use your own, put an .mp3 in /public/audio/ and set
 *     `music.src: "/audio/your-song.mp3"`. Only use music you have rights to.
 *
 *  PLAYLIST (6 songs)
 *   • Each song plays right on the page. The six default files are short,
 *     original demo tunes so the player works out of the box — replace each
 *     `src` with your own .mp3 (e.g. "/audio/song-1.mp3") and fill in the title,
 *     artist and the little note about why the song matters.
 *   • `link` is optional: paste a Spotify / YouTube / Apple Music link to show
 *     an "open" button next to the song.
 */
import defaultMusic from "@/assets/birthday-music.mp3.asset.json";
import memoryVideo from "@/assets/moments-in-motion.mp4.asset.json";
import memoryPoster from "@/assets/moments-poster.jpg.asset.json";
import song1 from "@/assets/playlist-song-1.mp3.asset.json";
import song2 from "@/assets/playlist-song-2.mp3.asset.json";
import song3 from "@/assets/playlist-song-3.mp3.asset.json";
import song4 from "@/assets/playlist-song-4.mp3.asset.json";
import song5 from "@/assets/playlist-song-5.mp3.asset.json";
import song6 from "@/assets/playlist-song-6.mp3.asset.json";

export type Song = {
  title: string;
  artist: string;
  /** A short line about why this song is on the list. */
  note: string;
  /** Audio file path or URL. */
  src: string;
  /** Optional streaming link (Spotify, YouTube, …). "" hides the button. */
  link: string;
};

export type Photo = {
  /** Image path or URL. Leave "" to show a placeholder. */
  src: string;
  alt: string;
  caption: string;
};

export type Memory = {
  title: string;
  /** Optional — leave "" to hide. */
  date: string;
  /** Short line shown on the card. */
  summary: string;
  /** Full story shown when the card is opened. */
  description: string;
};

export const birthday = {
  recipient: {
    fullName: "[FULL NAME]",
    nickname: "[NICKNAME]",
    /** Special pet name — the little bee in the header carries it (shown on hover). */
    petName: "little bee",
    /** Main portrait for the "About you" section. Leave "" for a placeholder. */
    profilePhoto: "",
    profilePhotoAlt: "Portrait of [NICKNAME]",
  },

  /** Name of the person giving this gift — used to sign the letter. */
  from: "[YOUR NAME]",

  musicModal: {
    eyebrow: "A little something for you",
    heading: "Would you like some music?",
    description: "Let's make this little celebration a bit more special.",
    yes: "Ya, putar musik",
    no: "Tidak, tanpa musik",
  },

  hero: {
    eyebrow: "A special day • Made just for you",
    greeting: "Happy Birthday,",
    supporting: "Today is all about celebrating you and the beautiful memories you've created.",
    cta: "Explore Your Special Day",
  },

  about: {
    eyebrow: "A little introduction",
    heading: "A little appreciation for you.",
    paragraphs: [
      "[ABOUT PARAGRAPH 1 — describe who they are: their character, what makes them, them.]",
      "[ABOUT PARAGRAPH 2 — their little habits, the things they love, the way they make people feel.]",
    ],
    /** Three short words or phrases shown as highlights. */
    qualities: ["[QUALITY 1]", "[QUALITY 2]", "[QUALITY 3]"],
  },

  gallery: {
    eyebrow: "Captured moments",
    heading: "A few frames of you.",
    photos: [
      { src: "", alt: "[Describe photo 1]", caption: "[PHOTO 1 CAPTION]" },
      { src: "", alt: "[Describe photo 2]", caption: "[PHOTO 2 CAPTION]" },
      { src: "", alt: "[Describe photo 3]", caption: "[PHOTO 3 CAPTION]" },
      { src: "", alt: "[Describe photo 4]", caption: "[PHOTO 4 CAPTION]" },
      { src: "", alt: "[Describe photo 5]", caption: "[PHOTO 5 CAPTION]" },
      { src: "", alt: "[Describe photo 6]", caption: "[PHOTO 6 CAPTION]" },
      { src: "", alt: "[Describe photo 7]", caption: "[PHOTO 7 CAPTION]" },
      { src: "", alt: "[Describe photo 8]", caption: "[PHOTO 8 CAPTION]" },
    ] satisfies Photo[],
  },

  video: {
    eyebrow: "Moments in motion",
    heading: "Some memories are even more beautiful when they move.",
    /** Local file (/video/memory.mp4), direct video URL, or YouTube/Vimeo link. "" = placeholder. */
    src: memoryVideo.url,
    /** Thumbnail image shown before the video plays (optional). */
    poster: memoryPoster.url,
    /** Replay automatically when it ends (nice for short clips). */
    loop: true,
    caption: "[VIDEO CAPTION — optional, e.g. where or when it was filmed]",
  },

  memories: {
    eyebrow: "Little stories",
    heading: "Memories worth keeping.",
    items: [
      {
        title: "[MEMORY 1 TITLE]",
        date: "[DATE — optional]",
        summary: "[One-line teaser for memory 1]",
        description: "[MEMORY 1 STORY — write the full memory here.]",
      },
      {
        title: "[MEMORY 2 TITLE]",
        date: "[DATE — optional]",
        summary: "[One-line teaser for memory 2]",
        description: "[MEMORY 2 STORY — write the full memory here.]",
      },
      {
        title: "[MEMORY 3 TITLE]",
        date: "[DATE — optional]",
        summary: "[One-line teaser for memory 3]",
        description: "[MEMORY 3 STORY — write the full memory here.]",
      },
      {
        title: "[MEMORY 4 TITLE]",
        date: "[DATE — optional]",
        summary: "[One-line teaser for memory 4]",
        description: "[MEMORY 4 STORY — write the full memory here.]",
      },
      {
        title: "[MEMORY 5 TITLE]",
        date: "[DATE — optional]",
        summary: "[One-line teaser for memory 5]",
        description: "[MEMORY 5 STORY — write the full memory here.]",
      },
      {
        title: "[MEMORY 6 TITLE]",
        date: "[DATE — optional]",
        summary: "[One-line teaser for memory 6]",
        description: "[MEMORY 6 STORY — write the full memory here.]",
      },
    ] satisfies Memory[],
  },

  playlist: {
    eyebrow: "Songs for you",
    heading: "A little playlist for your day.",
    songs: [
      { title: "[SONG 1 TITLE]", artist: "[ARTIST]", note: "[Why this song reminds you of them]", src: song1.url, link: "" },
      { title: "[SONG 2 TITLE]", artist: "[ARTIST]", note: "[Why this song reminds you of them]", src: song2.url, link: "" },
      { title: "[SONG 3 TITLE]", artist: "[ARTIST]", note: "[Why this song reminds you of them]", src: song3.url, link: "" },
      { title: "[SONG 4 TITLE]", artist: "[ARTIST]", note: "[Why this song reminds you of them]", src: song4.url, link: "" },
      { title: "[SONG 5 TITLE]", artist: "[ARTIST]", note: "[Why this song reminds you of them]", src: song5.url, link: "" },
      { title: "[SONG 6 TITLE]", artist: "[ARTIST]", note: "[Why this song reminds you of them]", src: song6.url, link: "" },
    ] satisfies Song[],
  },

  letter: {
    eyebrow: "A letter for you",
    heading: "A few words on your special day.",
    greeting: "Dear [NICKNAME],",
    /** Each string is one paragraph. Add or remove paragraphs freely. */
    paragraphs: ["[BIRTHDAY LETTER CONTENT]"],
    signOff: "With love,",
  },

  finalWish: {
    eyebrow: "And finally...",
    heading: "May your days always bloom beautifully.",
    description:
      "May this new chapter bring you happiness, meaningful experiences, and countless beautiful moments.",
    closing: "Happy Birthday! ♡",
  },

  music: {
    src: defaultMusic.url,
    title: "Little Bloom — original music box",
  },

  footer: "Made with care.",
};

export type BirthdayContent = typeof birthday;
