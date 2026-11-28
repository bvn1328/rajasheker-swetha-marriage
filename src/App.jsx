import React, { useEffect, useMemo, useState } from 'react';
import {
  Heart, CalendarDays, MapPin, Clock3, Globe2, Volume2, VolumeX,
  ChevronRight, Sparkles, Camera, MessageCircle, X, Music2, Check, Phone
} from 'lucide-react';
import BrideImage from './images/Bride.jpeg';
import coupleImage2 from './images/Couple2.jpeg';
import TraditionalImage from './images/Traditional.jpeg';
import GroomImage1 from './images/Groom1.jpeg';
import FamilyImage from './images/Family.jpeg';


const wedding = {
  groom: {
    en: 'Rajashekar Nayak Banoth', te: 'రాజశేఖర్ నాయక్ బానోత్',
    fatherEn: 'Sri Lagjiram Banoth', fatherTe: 'శ్రీ లగ్జీరామ్ బానోత్',
    motherEn: 'Smt. Anusha Banoth', motherTe: 'శ్రీమతి అనుష బానోత్'
  },
  bride: {
    en: 'Swetha Maloth', te: 'శ్వేత మాలోత్',
    fatherEn: 'Sri Parmesh Maloth', fatherTe: 'శ్రీ పరమేష్ మాలోత్',
    motherEn: 'Smt. Pushapalatha Maloth', motherTe: 'శ్రీమతి పూశాపాలతా మాలోత్'
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
   "venue":"Groom's Residence, Substation Backside, Nizamabad Road, Kamareddy",
   "venueTe":"వరుడి నివాస గృహం, సబ్‌స్టేషన్ వెనుక - కామారెడ్డి ",
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
   "map":"https://goo.gl/maps/VUc27wXExfKSkY3Z6"
},
{
   "title":"Grand Royal Reception",
   "te":"శ్రీమద్ వివాహ విందు & స్నేహసమ్మేళనం",
   "date":"Dec 04, 2026",
   "dateTe":"డిసెంబర్ 04, 2026",
   "time":"09:00 AM Onwards",
   "timeTe":"ఉదయం 09:00 గంటల నుండి",
   "venue":"Groom's Residence, Substation Backside, Nizamabad Road,Kamareddy",
   "venueTe":"వరుడి నివాస గృహం, సబ్‌స్టేషన్ వెనుక - కామారెడ్డి",
   "desc":"An evening of royal banquets, music, felicitations, and high celebration with family & friends.",
   "map":"https://maps.app.goo.gl/wiyGtRW7j2RGNykv9"
}  
  ],
  gallery: [
    ['Royal Union',coupleImage2,'couple'],
    ['Ring Ceremony',coupleImage2,'engagement'],
    ['Family',FamilyImage,'family'],
    ['Bride',BrideImage,'bride'],
    ['Traditional Elegance',TraditionalImage,'groom'],
    ['Family Blessings',GroomImage1,'groom']
  ]
};

const filters = ['all','couple','engagement','groom','bride','family'];
const phoneNumber = '+918121603272';
const phoneNumber1= '+918247534365';
const googleDriveFolderLink =
  'https://drive.google.com/drive/folders/1CmY-eFk-6XEo3zPB6FggcdgriXfG51GF?usp=sharing';

function App() {
  const [opened, setOpened] = useState(false);
  const [lang, setLang] = useState('en');
  const [audio, setAudio] = useState(true);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [preview, setPreview] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'yes', guests: '2', message: '' });
  const [sent, setSent] = useState(false);
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });
  const te = lang === 'te';
  const weddingCeremony = wedding.events[2];
  const reception = wedding.events[3];

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
    const message = `Namaste! RSVP for ${wedding.groom.en} & ${wedding.bride.en}'s Wedding:\nGuest Name: ${rsvp.name}\nAttending: ${rsvp.attendance === 'yes' ? 'Yes, Joyfully!' : 'Sorry, Cannot Attend'}\nTotal Guests: ${rsvp.guests}\nMessage: ${rsvp.message || 'Blessings to the couple!'}`;
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
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
        <h1>{te ? `${wedding.groom.te.split(' ')[0]} & ${wedding.bride.te.split(' ')[0]}` : `${wedding.groom.en.split(' ')[0]} & ${wedding.bride.en.split(' ')[0]}`}</h1>
        <p className="opening-date">{weddingCeremony.date.toUpperCase()}</p>
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
            <div className="date-pill"><CalendarDays size={19}/>{te ? weddingCeremony.dateTe : weddingCeremony.date}</div>
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
            <article className="venue-card"><span className="venue-tag">{te ? 'సుముహూర్తం' : 'MUHURTHAM'}</span><h3>{te ? weddingCeremony.te : weddingCeremony.title}</h3><p><CalendarDays/>{te ? weddingCeremony.dateTe : weddingCeremony.date}</p><p><Clock3/>{te ? weddingCeremony.timeTe : weddingCeremony.time}</p><p><MapPin/>{te ? weddingCeremony.venueTe : weddingCeremony.venue}</p>{weddingCeremony.map && <a className="outline-button" href={weddingCeremony.map} target="_blank" rel="noreferrer"><MapPin size={17}/> {te ? 'వివాహ స్థలాన్ని చూడండి' : 'VIEW WEDDING LOCATION'}</a>}</article>
            <article className="venue-card"><span className="venue-tag">{te ? 'విందు వేడుక' : 'RECEPTION'}</span><h3>{te ? reception.te : reception.title}</h3><p><CalendarDays/>{te ? reception.dateTe : reception.date}</p><p><Clock3/>{te ? reception.timeTe : reception.time}</p><p><MapPin/>{te ? reception.venueTe : reception.venue}</p>{reception.map && <a className="outline-button" href={reception.map} target="_blank" rel="noreferrer"><MapPin size={17}/> {te ? 'విందు స్థలాన్ని చూడండి' : 'VIEW RECEPTION LOCATION'}</a>}</article>
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

        {/* Google Drive wedding photo sharing section */}
        <section className="drive-section section" id="share-photos">
          <div className="drive-content">
            <div className="drive-icon"><Camera size={34} /></div>
            <span className="eyebrow">
              {te ? 'మధుర జ్ఞాపకాలను పంచుకోండి' : 'SHARE YOUR MEMORIES'}
            </span>
            <h2>
              {te ? 'వివాహ ఫోటో ఆల్బమ్' : 'Wedding Photo Album'}
            </h2>
            <p>
              {te
                ? 'మా వేడుకల అందమైన క్షణాలను చూడండి. మీ వద్ద ఉన్న ఫోటోలను కూడా మా Google Drive ఫోల్డర్‌లో పంచుకోండి.'
                : 'View the beautiful moments from our celebrations. You can also share your favourite wedding photos through our Google Drive folder.'}
            </p>
            <a
              className="drive-button"
              href={googleDriveFolderLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera size={18} />
              {te ? 'గూగుల్ డ్రైవ్ ఫోల్డర్ తెరవండి' : 'OPEN GOOGLE DRIVE FOLDER'}
            </a>
            <p className="drive-note">
              {te
                ? 'రాజశేఖర్ & శ్వేతలతో మీ మధుర జ్ఞాపకాలను పంచుకోండి ❤️'
                : 'Share your beautiful memories with Rajashekar & Swetha ❤️'}
            </p>
          </div>
        </section>
        

{/* Wedding Contact Numbers Section */}
<section className="contact-section section" id="contact-us">
  <div className="section-heading">
    <span className="eyebrow">
      {te ? 'మరిన్ని వివరాల కోసం సంప్రదించండి' : 'WE ARE HAPPY TO HELP'}
    </span>

    <h2>
      {te ? 'మమ్మల్ని సంప్రదించండి' : 'Contact Us'}
    </h2>

    <div className="gold-line" />

    <p>
      {te
        ? 'వివాహ వేడుకలకు సంబంధించిన వివరాల కోసం క్రింది నంబర్లను సంప్రదించండి.'
        : 'For wedding details, venue information or any assistance, please contact us.'}
    </p>
  </div>

  <div className="contact-grid">

    {/* Contact Number 1 */}
    <div className="contact-card">
      <div className="contact-icon">
        <Phone size={28} />
      </div>

      <span className="eyebrow">CONTACT 01</span>

      <h3>Wedding Enquiries</h3>

      <a className="contact-number" href={`tel:${phoneNumber}`}>
        +91 81216 03272
      </a>

      <div className="contact-actions">
        <a href={`tel:${phoneNumber}`} className="contact-call">
          <Phone size={17} /> Call Now
        </a>

        <a
          href={`https://wa.me/${phoneNumber.replace('+', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-whatsapp"
        >
          <MessageCircle size={17} /> WhatsApp
        </a>
      </div>
    </div>

    {/* Contact Number 2 */}
    <div className="contact-card">
      <div className="contact-icon">
        <Phone size={28} />
      </div>

      <span className="eyebrow">CONTACT 02</span>

      <h3>Additional Enquiries</h3>

      <a className="contact-number" href={`tel:${phoneNumber1}`}>
        +91 82475 34365
      </a>

      <div className="contact-actions">
        <a href={`tel:${phoneNumber1}`} className="contact-call">
          <Phone size={17} /> Call Now
        </a>

        <a
          href={`https://wa.me/${phoneNumber1.replace('+', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-whatsapp"
        >
          <MessageCircle size={17} /> WhatsApp
        </a>
      </div>
    </div>

  </div>
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

        <footer className="footer"><div className="mini-seal">R &amp; S</div><h2>FOREVER BEGINS HERE</h2><p className="eyebrow">WITH LOVE, {wedding.groom.en.split(' ')[0].toUpperCase()} &amp; {wedding.bride.en.split(' ')[0].toUpperCase()}</p><div className="gold-line"/><p className="telugu-quote">“మీ ఆశీస్సులతో మా కొత్త ప్రయాణం ప్రారంభమవుతుంది”</p><p>With your divine blessings &amp; presence, our new journey begins.</p></footer>
      </main>

      {preview && <div className="lightbox" onClick={() => setPreview(null)}><button aria-label="Close image"><X/></button><img src={preview.url} alt={preview.title}/><p>{preview.title}</p></div>}
    </div>
  );
}

export default App;
