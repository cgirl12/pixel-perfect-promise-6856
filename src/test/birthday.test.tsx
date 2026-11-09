import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { birthday } from "@/content/birthday";
import { MusicPreferenceModal } from "@/components/birthday/MusicPreferenceModal";
import { toEmbedUrl } from "@/components/birthday/VideoMemory";

describe("Music preference modal", () => {
  it("'Ya, putar musik' chooses music", () => {
    const onChoose = vi.fn();
    render(<MusicPreferenceModal open content={birthday.musicModal} onChoose={onChoose} />);
    fireEvent.click(screen.getByRole("button", { name: /Ya, putar musik/ }));
    expect(onChoose).toHaveBeenCalledWith(true);
  });

  it("'Tidak, tanpa musik' chooses no music", () => {
    const onChoose = vi.fn();
    render(<MusicPreferenceModal open content={birthday.musicModal} onChoose={onChoose} />);
    fireEvent.click(screen.getByRole("button", { name: /Tidak, tanpa musik/ }));
    expect(onChoose).toHaveBeenCalledWith(false);
  });
});

describe("Content configuration", () => {
  it("has exactly 8 gallery photos", () => {
    expect(birthday.gallery.photos).toHaveLength(8);
  });

  it("has exactly 6 memory cards", () => {
    expect(birthday.memories.items).toHaveLength(6);
  });
});

describe("Video source", () => {
  it("turns a YouTube link into an embed", () => {
    expect(toEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0",
    );
  });

  it("keeps direct video files as native video", () => {
    expect(toEmbedUrl("/video/memory.mp4")).toBeNull();
  });
});
