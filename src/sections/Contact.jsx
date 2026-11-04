import { Github, Linkedin, MapPin, MessageCircle, Phone } from "lucide-react";
import CopyEmail from "../components/CopyEmail";
import Magnetic from "../components/Magnetic";
import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../contexts/LanguageContext";
import { profile } from "../content";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="block contact">
      <SectionHeading index={6} label={t.nav.contact} title={t.contact.heading} align="center" />

      <ScrollReveal className="contact-body">
        <p className="lead">{t.contact.p1}</p>

        <CopyEmail email={profile.email} copyLabel={t.contact.copy} copiedLabel={t.contact.copied} />

        <div className="contact-actions">
          <Magnetic>
            <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={18} /> {t.contact.whatsapp}
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.phoneHref} className="btn btn-ghost">
              <Phone size={18} /> {t.contact.call}
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Linkedin size={18} /> LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Github size={18} /> GitHub
            </a>
          </Magnetic>
        </div>

        <p className="contact-meta">
          <MapPin size={16} aria-hidden="true" /> {t.contact.location} · {profile.phone}
        </p>
      </ScrollReveal>
    </section>
  );
}
