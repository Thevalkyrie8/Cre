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
    <header className="home-shell partner-marquee__header">
      <h2
        id="partner-marquee-title"
        data-en="Good work travels further together."
        data-vi="Công việc tốt đi xa hơn khi có người đồng hành đúng."
      >
        Good work travels further together.
      </h2>
      <p
        data-en="A growing circle of teams who trust Unitrux to turn ideas into work that moves."
        data-vi="Những đối tác tin tưởng Unitrux cùng biến ý tưởng thành giá trị thực tế."
      >
        A growing circle of teams who trust Unitrux to turn ideas into work that moves.
      </p>
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
