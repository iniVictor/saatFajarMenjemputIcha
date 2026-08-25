import { useCallback, useRef } from "react";
import { ClosingSection } from "@/components/ClosingSection/ClosingSection";
import { Countdown } from "@/components/Countdown/Countdown";
import { CoupleSection } from "@/components/CoupleSection/CoupleSection";
import { DigitalGift } from "@/components/DigitalGift/DigitalGift";
import { EventSection } from "@/components/EventSection/EventSection";
import { FloatingNavigation } from "@/components/FloatingNavigation/FloatingNavigation";
import { Gallery } from "@/components/Gallery/Gallery";
import { Hero } from "@/components/Hero/Hero";
import { LoveStory } from "@/components/LoveStory/LoveStory";
import { MusicPlayer } from "@/components/MusicPlayer/MusicPlayer";
import { OpeningScreen } from "@/components/OpeningScreen/OpeningScreen";
import { PhysicalGift } from "@/components/PhysicalGift/PhysicalGift";
import { QuoteSection } from "@/components/QuoteSection/QuoteSection";
import { StreamingSection } from "@/components/StreamingSection/StreamingSection";
import { SeoBoot, ThemeBoot } from "@/components/UI/DocumentBoot";
import { Toast } from "@/components/UI/Toast";
import { Wishes } from "@/components/Wishes/Wishes";
import { Grain } from "@/components/Decor/Grain";
import { weddingConfig } from "@/config/wedding";
import { useGuestName } from "@/hooks/useGuestName";
import { useInvitationOpen } from "@/hooks/useInvitationOpen";
import { useMusic } from "@/hooks/useMusic";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ToastProvider } from "@/hooks/useToast";
import { KirimUndangan } from "@/pages/KirimUndangan";
import { isKirimUndanganPath } from "@/utils/inviteLink";

const SECTION_IDS = ["home", "couple", "event", "gallery", "wishes"] as const;

function Invitation() {
  const guestName = useGuestName();
  const { opened, coverVisible, open } = useInvitationOpen();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeId = useScrollSpy(SECTION_IDS, scrollRef, opened);
  const music = useMusic({
    enabled: weddingConfig.music.enabled,
    src: weddingConfig.music.src,
    unlocked: opened,
    loopStart: weddingConfig.music.loopStart,
    loopEnd: weddingConfig.music.loopEnd,
  });

  const go = useCallback((id: string) => {
    const node = scrollRef.current?.querySelector(`#${id}`);
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="shell">
      <div className="phone" id="invitation-shell">
        <Grain />
        <div
          ref={scrollRef}
          className={`phone-scroll ${opened ? "" : "is-locked"}`}
        >
          {coverVisible ? (
            <OpeningScreen
              guestName={guestName}
              leaving={opened}
              onOpen={open}
            />
          ) : null}

          {opened ? (
            <>
              <Hero />
              <QuoteSection />
              <CoupleSection />
              <LoveStory />
              <Countdown />
              <EventSection />
              <StreamingSection />
              <Gallery />
              <DigitalGift />
              <PhysicalGift />
              <Wishes guestName={guestName} />
              <ClosingSection />
            </>
          ) : null}
        </div>

        {opened ? (
          <>
            {music.visible ? (
              <MusicPlayer
                playing={music.playing}
                onToggle={music.toggle}
                label={weddingConfig.music.title}
              />
            ) : null}
            <FloatingNavigation activeId={activeId} onNavigate={go} />
          </>
        ) : null}

        <Toast />
      </div>
    </div>
  );
}

export default function App() {
  const generatorPage = isKirimUndanganPath();

  return (
    <ToastProvider>
      <ThemeBoot />
      <SeoBoot />
      {generatorPage ? <KirimUndangan /> : <Invitation />}
    </ToastProvider>
  );
}
