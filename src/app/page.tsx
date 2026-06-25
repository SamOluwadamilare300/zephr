import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { TrustMetrics } from "@/components/trust-metrics";
import { TrackRecord } from "@/components/track-record";
import { Timeline } from "@/components/timeline";
import { Vision } from "@/components/vision";
import { Testimonials } from "@/components/testimonials";
import { Gallery } from "@/components/gallery";
import { AskZephyr } from "@/components/ask-zephyr";
import { AmbassadorCta } from "@/components/ambassador-cta";
import { JoinMovement } from "@/components/join-movement";
import { Footer } from "@/components/footer";
import { QrTracker } from "@/components/qr-tracker";
import { getGallery } from "@/lib/data";

export default async function Home() {
  const gallery = await getGallery();

  return (
    <>
      <QrTracker />
      {/* <Nav /> */}
      <Hero />
      {/* <TrustMetrics /> */}
      <TrackRecord />
      <Timeline />
      <Vision />
      {/* <Testimonials /> */}
      <Gallery items={gallery} />
      {/* <AskZephyr /> */}
      <AmbassadorCta />
      <JoinMovement />
      <Footer />
    </>
  );
}
