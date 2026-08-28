import partnerRecognition from '../../logo-parnert/img-1.png';
import gritEduLogo from '../../logo-parnert/img-2.png';
import oppaPhotoBoothLogo from '../../logo-parnert/img-3.jpg';
import ttkPhuHoiLogo from '../../logo-parnert/img-4.jpg';

const partners = [
  { src: gritEduLogo, name: 'GRIT EDU' },
  { src: oppaPhotoBoothLogo, name: 'Oppa Photo Booth' },
  { src: ttkPhuHoiLogo, name: 'TTK Phú Hội' },
  { src: partnerRecognition, name: 'Partner recognition' },
];

const PartnerGroup = ({ duplicate = false }) => (
  <div className="partner-marquee__group" aria-hidden={duplicate || undefined}>
    {partners.map((partner) => (
      <div className="partner-marquee__logo" key={`${duplicate ? 'duplicate-' : ''}${partner.name}`}>
        <img
          src={partner.src}
          alt={duplicate ? '' : `${partner.name} logo`}
          loading="eager"
          decoding="async"
          draggable="false"
        />
      </div>
    ))}
  </div>
);

const PartnerMarquee = () => (
  <section
    className="partner-marquee"
    aria-labelledby="partner-marquee-title"
  >
    <header className="home-shell partner-marquee__header" data-reveal>
      <p className="home-kicker" data-en="Partners & trust" data-vi="Đồng hành & tin tưởng">Partners &amp; trust</p>
      <h2
        id="partner-marquee-title"
        data-en="Businesses and partners already working with Unitrux."
        data-vi="Cùng nhiều đối tác & khách hàng đã sử dụng dịch vụ tại Unitrux."
      >
        Businesses and partners already working with Unitrux.
      </h2>
    </header>

    <div className="partner-marquee__stage">
      <div className="partner-marquee__viewport">
        <div className="partner-marquee__track">
          <PartnerGroup />
          <PartnerGroup duplicate />
        </div>
      </div>
    </div>
  </section>
);

export default PartnerMarquee;
