import React, { useEffect, useMemo, useState } from 'react';
import {
  Heart, CalendarDays, MapPin, Clock3, Globe2, Volume2, VolumeX,
  ChevronRight, Sparkles, Camera, MessageCircle, X, Music2, Check
} from 'lucide-react';
import coupleImage from './images/Couple.jpeg';

const wedding = {
  groom: {
    en: 'Rajashekar Banoth', te: 'రాజశేఖర్ బానోత్',
    fatherEn: 'Sri Lagjiram Banoth', fatherTe: 'శ్రీ లగ్జీరామ్ బానోత్',
    motherEn: 'Smt. Anusha Banoth', motherTe: 'శ్రీమతి అనుష బానోత్'
  },
  bride: {
    en: 'Swetha Malavath', te: 'శ్వేత మాలవత్',
    fatherEn: 'Sri Parmesh Malavath', fatherTe: 'శ్రీ పరమేష్ మాలవత్',
    motherEn: 'Smt. Sakkubai Malavath', motherTe: 'శ్రీమతి సక్కుబాయి మాలవత్'
  },
  date: '2026-12-03T09:03:00+05:30',
  events: [
    {
   "title":"Pellikoduku Ceremony",
   "te":"పెళ్లికొడుకు చేయుట",
   "date":"Dec 02, 2026",
   "dateTe":"డిసెంబర్ 02, 2026",
   "time":"02:30 PM Onwards",
   "timeTe":"సాయంత్రం 02:30 గంటల నుండి",
   "venue":"Groom's Residence, Kamareddy",
   "venueTe":"వరుడి నివాస గృహం, కామారెడ్డి",
   "desc":"Traditional auspicious ceremony where the groom is prepared with turmeric (Haldi) and divine blessings."
},
{
   "title":"Pellikuthuru Ceremony",
   "te":"పెళ్లికూతురు చేయుట",
   "date":"Dec 02, 2026",
   "dateTe":"డిసెంబర్ 02, 2026",
   "time":"09:30 PM Onwards",
   "timeTe":"సాయంత్రం 9:30 గంటల నుండి",
   "venue":"Bride's Residence, Sudarshan Nagar Thanda, Bheemgal, Nzb",
   "venueTe":"వధువు నివాస గృహం, సుదర్శన్ నగర్ తండా, భీంగల్, NZB",
   "desc":"Sacred turmeric and floral ceremony honoring the bride as she prepares for her wedding vows."
},
{
   "title":"Sumuhurtham & Holy Wedlock",
   "te":"సుముహూర్తం & కళ్యాణ మహోత్సవం",
   "date":"Dec 03, 2026",
   "dateTe":"డిసెంబర్ 03, 2026",
   "time":"Sumuhurtham: 09:03 AM",
   "timeTe":"సుముహూర్తం: ఉదయం 09:03 నిమిషాలకు",
   "venue":"Brides Residence, Sudarshan Nagar Thanda, Bheemgal, Nzb",
   "venueTe":"వధువు నివాస గృహం, సుదర్శన్ నగర్ తండా, భీంగల్, NZB",
   "desc":"The auspicious sacred moment of Jeelakarra Bellam & Talambralu, uniting two souls for eternity.",
   "map":"https://maps.app.goo.gl/E7EKQYKnm5E7MJDT7"
},
{
   "title":"Grand Royal Reception",
   "te":"శ్రీమద్ వివాహ విందు & స్నేహసమ్మేళనం",
   "date":"Dec 04, 2026",
   "dateTe":"డిసెంబర్ 04, 2026",
   "time":"09:00 AM Onwards",
   "timeTe":"ఉదయం 09:00 గంటల నుండి",
   "venue":"Groom's Residence, Kamareddy",
   "venueTe":"వరుడి నివాస గృహం, కామారెడ్డి",
   "desc":"An evening of royal banquets, music, felicitations, and high celebration with family & friends.",
   "map":"https://maps.app.goo.gl/rJNXxRm1gx9A9CEH7"
}  
  ],
  gallery: [
    ['Royal Union',coupleImage,'couple'],
    ['Ring Ceremony','https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80','engagement'],
    ['Groom','https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80','groom'],
    ['Bride','https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80','bride'],
    ['Traditional Elegance','https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80','couple'],
    ['Family Blessings','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80','family']
  ]
};

const filters = ['all','couple','engagement','groom','bride','family'];
const phoneNumber = '+919440717334';

function App() {
  const [opened, setOpened] = useState(false);
  const [lang, setLang] = useState('en');
  const [audio, setAudio] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [preview, setPreview] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'yes', guests: '2', message: '' });
  const [sent, setSent] = useState(false);
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });
  const te = lang === 'te';

  useEffect(() => {
    const update = () => {
      const diff = new Date(wedding.date).getTime() - Date.now();
      if (diff <= 0) return setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        passed: false
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Original synthesized ambient tones; browsers start audio only after a user click.
  const toggleMusic = () => {
    if (audio) {
      window.__weddingOscillators?.forEach(o => { try { o.stop(); } catch {} });
      window.__weddingOscillators = [];
      setAudio(false);
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const oscillators = [];
    [293.66,329.63,369.99,440,493.88,440,369.99,329.63].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.018;
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.42);
      osc.stop(ctx.currentTime + i * 0.42 + 0.36);
      oscillators.push(osc);
    });
    window.__weddingOscillators = oscillators;
    setAudio(true);
    setTimeout(() => setAudio(false), 4200);
  };

  const gallery = useMemo(() => wedding.gallery.filter(item => galleryFilter === 'all' || item[2] === galleryFilter), [galleryFilter]);

  const submitRsvp = (e) => {
    e.preventDefault();
    const message = `Namaste! RSVP for ${wedding.groom.en} & ${wedding.bride.en}'s Wedding:\\nGuest Name: ${rsvp.name}\\nAttending: ${rsvp.attendance === 'yes' ? 'Yes, Joyfully!' : 'Sorry, Cannot Attend'}\\nTotal Guests: ${rsvp.guests}\\nMessage: ${rsvp.message || 'Blessings to the couple!'}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const familyCard = (person, side) => (
    <article className="family-card">
      <div className="round-icon">{side === 'bride' ? <Heart /> : <Sparkles />}</div>
      <span className="eyebrow">{side === 'bride' ? (te ? 'వధువు వైపు వారు' : "Bride's Family") : (te ? 'వరుడి వైపు వారు' : "Groom's Family")}</span>
      <h3>{te ? person.te : person.en}</h3>
      <div className="gold-line" />
      <small>{te ? (side === 'bride' ? 'పుత్రిక' : 'సుపుత్రుడు') : (side === 'bride' ? 'Daughter of' : 'Son of')}</small>
      <p>{te ? person.fatherTe : person.fatherEn}</p>
      <span>&</span>
      <p>{te ? person.motherTe : person.motherEn}</p>
    </article>
  );

  return (
    <div className="site-shell">
      <div className="ambient-pattern" />
      <div className="toolbar">
        <button className="language-button" onClick={() => setLang(te ? 'en' : 'te')}><Globe2 size={16}/>{te ? 'ENGLISH' : 'తెలుగు'}</button>
        <button className="sound-button" onClick={toggleMusic} aria-label="Toggle music">{audio ? <Volume2/> : <VolumeX/>}</button>
      </div>

      {!opened && <section className="opening">
        <div className="corner corner-a" /><div className="corner corner-b" /><div className="corner corner-c" /><div className="corner corner-d" />
        <div className="seal" onClick={() => setOpened(true)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpened(true)}>
          <div className="seal-inner"><strong>R&amp;S</strong><span>ROYAL SEAL</span></div>
        </div>
        <p className="eyebrow">{te ? 'రాచరిక తెలుగు వివాహ ఆహ్వానం' : 'ROYAL TELUGU WEDDING INVITATION'}</p>
        <h1>{te ? 'రాజశేఖర్ & శ్వేత' : 'Rajashekar & Swetha'}</h1>
        <p className="opening-date">03 DECEMBER 2026 · HYDERABAD</p>
        <button className="primary-button" onClick={() => { setOpened(true); }}>{te ? 'వివాహ ఆహ్వానాన్ని తెరవండి' : 'Open Our Wedding Invitation'} <ChevronRight size={19}/></button>
        <button className="skip-button" onClick={() => setOpened(true)}>{te ? 'స్కిప్ చేయండి' : 'Skip animation'}</button>
      </section>}

      <main className={opened ? 'main-content visible' : 'main-content hidden'}>
        <section className="hero">
          <div className="hero-frame" />
          <div className="hero-content">
            <div className="auspicious">{te ? 'శుభమస్తు' : 'శుభమస్తు'}</div>
            <span className="eyebrow">{te ? 'దివ్య మంగళాశాసనాలు' : 'AUSPICIOUS BLESSINGS'}</span>
            <div className="gold-line" />
            <p className="intro-label">{te ? 'మా కుటుంబ సభ్యుల ఆశీస్సులతో' : 'WITH THE BLESSINGS OF OUR FAMILIES'}</p>
            <div className="mini-seal">R &amp; S</div>
            <h2>{te ? wedding.groom.te : wedding.groom.en}<span>&amp;</span>{te ? wedding.bride.te : wedding.bride.en}</h2>
            <p className="hero-copy">{te ? 'మా నూతన జీవిత ప్రయాణానికి మీ దివ్యమైన ప్రేమానురాగాలు మరియు ఆశీస్సులు అందించవలసిందిగా సస్నేహంగా ఆహ్వానిస్తున్నాము.' : 'Request the pleasure of your company as we celebrate our holy wedding vows and begin our beautiful life journey together.'}</p>
            <div className="date-pill"><CalendarDays size={19}/>{te ? 'గురువారం, 03 డిసెంబర్ 2026' : 'THURSDAY, 03 DECEMBER 2026'}</div>
          </div>
        </section>

        <section className="countdown section">
          <span className="eyebrow">{te ? 'సుముహూర్తానికి సమయం' : 'COUNTDOWN TO MUHURTHAM'}</span>
          <h2>{remaining.passed ? (te ? 'వేడుకలు ప్రారంభమయ్యాయి!' : 'The Celebrations Have Begun!') : (te ? 'మంగళకర క్షణాల నిరీక్షణ' : 'Counting Down The Moments')}</h2>
          <div className="timer-grid">{[['DAYS','రోజులు',remaining.days],['HOURS','గంటలు',remaining.hours],['MINS','నిమిషాలు',remaining.minutes],['SECS','సెకన్లు',remaining.seconds]].map(([en, tel, value]) => <div className="timer-box" key={en}><strong>{String(value).padStart(2,'0')}</strong><span>{te ? tel : en}</span></div>)}</div>
        </section>

        <section className="section family-section">
          <div className="section-heading"><span className="eyebrow">{te ? 'కుటుంబ సభ్యుల పరిచయం' : 'WITH SACRED FAMILY ANCESTRY'}</span><h2>{te ? 'వంశ పరంపర & ఆశీస్సులు' : 'Family Lineage & Blessings'}</h2><div className="gold-line"/></div>
          <div className="family-grid">{familyCard(wedding.bride, 'bride')}{familyCard(wedding.groom, 'groom')}</div>
        </section>

        <section className="events-section section">
          <div className="section-heading"><span className="eyebrow">{te ? 'ముఖ్య వేడుకల స్థలాలు' : 'AUSPICIOUS CELEBRATIONS'}</span><h2>{te ? 'కళ్యాణం & విందు వేడుకలు' : 'Ceremony & Reception Venues'}</h2></div>
          <div className="venue-grid">
            <article className="venue-card"><span className="venue-tag">{te ? 'సుముహూర్తం' : 'MUHURTHAM'}</span><h3>{te ? 'శ్రీమద్ వివాహ మహోత్సవం' : 'THE WEDDING CEREMONY'}</h3><p><CalendarDays/>Thursday, 03 December 2026</p><p><Clock3/>Sumuhurtham: 10:45 AM</p><p><MapPin/>Royal Palace Convention, Road No. 12, Banjara Hills, Hyderabad, Telangana</p><a className="outline-button" href="https://maps.app.goo.gl/E7EKQYKnm5E7MJDT7" target="_blank" rel="noreferrer"><MapPin size={17}/> VIEW WEDDING LOCATION</a></article>
            <article className="venue-card"><span className="venue-tag">{te ? 'విందు వేడుక' : 'RECEPTION'}</span><h3>{te ? 'వివాహ సత్కారం & విందు' : 'WEDDING RECEPTION'}</h3><p><CalendarDays/>Friday, 04 December 2026</p><p><Clock3/>Evening: 07:00 PM Onwards</p><p><MapPin/>The Grand Imperial Ballroom, Banjara Hills, Hyderabad, Telangana</p><a className="outline-button" href="https://maps.app.goo.gl/rJNXxRm1gx9A9CEH7" target="_blank" rel="noreferrer"><MapPin size={17}/> VIEW RECEPTION LOCATION</a></article>
          </div>
        </section>

        <section className="section timeline-section">
          <div className="section-heading"><span className="eyebrow">{te ? 'కార్యక్రమాల పట్టిక' : 'SCHEDULE OF FESTIVITIES'}</span><h2>{te ? 'శుభకార్యముల వివరాలు' : 'Wedding Ceremonies Timeline'}</h2></div>
          <div className="timeline">{wedding.events.map((event, i) => <article className="timeline-item" key={event.title}><div className="timeline-dot"/><span className="timeline-date">{te ? event.dateTe : event.date}</span><div className="timeline-card"><h3>{te ? event.te : event.title}</h3><p><Clock3/>{te ? event.timeTe : event.time}</p><p><MapPin/>{te ? event.venueTe : event.venue}</p><p className="description">{event.desc}</p>{event.map && <a href={event.map} target="_blank" rel="noreferrer" className="text-link">{te ? 'మ్యాప్ చూడండి' : 'View location'} ↗</a>}</div></article>)}</div>
        </section>

        <section className="gallery-section section">
          <div className="section-heading"><span className="eyebrow">{te ? 'మధుర జ్ఞాపకాలు' : 'MEMORIES & MOMENTS'}</span><h2>{te ? 'ఛాయాచిత్ర మాలిక' : 'Couple Photo Gallery'}</h2></div>
          <div className="filter-row">{filters.map(filter => <button key={filter} onClick={() => setGalleryFilter(filter)} className={galleryFilter === filter ? 'filter active' : 'filter'}>{filter}</button>)}</div>
          <div className="gallery-grid">{gallery.map(([title,url]) => <button className="gallery-image" key={title} onClick={() => setPreview({title,url})}><img src={url} alt={title}/><span><Camera size={16}/>{title}</span></button>)}</div>
        </section>

        <section className="rsvp-section section">
          <div className="rsvp-card"><div className="round-icon"><MessageCircle/></div><h2>{te ? 'మీ రాకను నిర్ధారించండి' : 'CONFIRM YOUR PRESENCE'}</h2><span className="eyebrow">{te ? 'వాట్సాప్ ద్వారా సమాచారం పంపండి' : 'RSVP VIA WHATSAPP'}</span>
            {sent ? <div className="success"><Check/><h3>{te ? 'ధన్యవాదాలు!' : 'Thank You!'}</h3><p>{te ? 'మీ RSVP వాట్సాప్‌లో తెరవబడింది.' : 'Your RSVP message has been opened in WhatsApp.'}</p></div> :
            <form onSubmit={submitRsvp}>
              <label>{te ? 'మీ పేరు' : 'GUEST NAME'} *<input required value={rsvp.name} onChange={e => setRsvp({...rsvp,name:e.target.value})} placeholder={te ? 'మీ పూర్తి పేరు వ్రాయండి' : 'Enter your full name'}/></label>
              <div className="form-row"><label>{te ? 'హాజరు' : 'ATTENDANCE'}<select value={rsvp.attendance} onChange={e => setRsvp({...rsvp,attendance:e.target.value})}><option value="yes">Joyfully Accept</option><option value="no">Regretfully Decline</option></select></label><label>{te ? 'అతిథుల సంఖ్య' : 'NO. OF GUESTS'}<select value={rsvp.guests} onChange={e => setRsvp({...rsvp,guests:e.target.value})}>{[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}</select></label></div>
              <label>{te ? 'శుభాకాంక్షల సందేశం' : 'BLESSINGS / MESSAGE'}<textarea rows="3" value={rsvp.message} onChange={e => setRsvp({...rsvp,message:e.target.value})} placeholder="Write your warm wishes for the couple..."/></label>
              <button className="primary-button submit-button" type="submit"><MessageCircle size={17}/>{te ? 'వాట్సాప్ ద్వారా పంపండి' : 'SEND RSVP VIA WHATSAPP'}</button>
            </form>}
            <p className="fine-print">WhatsApp number is {phoneNumber} .</p>
          </div>
        </section>

        <footer className="footer"><div className="mini-seal">R &amp; S</div><h2>FOREVER BEGINS HERE</h2><p className="eyebrow">WITH LOVE, RAJASHEKAR &amp; SWETHA</p><div className="gold-line"/><p className="telugu-quote">“మీ ఆశీస్సులతో మా కొత్త ప్రయాణం ప్రారంభమవుతుంది”</p><p>With your divine blessings &amp; presence, our new journey begins.</p></footer>
      </main>

      {preview && <div className="lightbox" onClick={() => setPreview(null)}><button aria-label="Close image"><X/></button><img src={preview.url} alt={preview.title}/><p>{preview.title}</p></div>}
    </div>
  );
}

export default App;
