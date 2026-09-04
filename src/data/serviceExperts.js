// E-E-A-T "who does this work" data for the Cluster F money pages.
// Playbook §18 + /content-standards: identify the responsible team, describe
// real capability, do not invent individual bios, credentials, or years of
// experience. Named individuals / credentials are TODO until Unitrux supplies
// verifiable details.

export const TODO = '[UNITRUX CẦN BỔ SUNG]';

const contentStandardsLink = {
  to: '/content-standards',
  labelVi: 'Tiêu chuẩn nội dung của Unitrux',
  labelEn: 'Unitrux content standards',
};

export const serviceExperts = {
  '/photography-video': {
    headingVi: 'Đội ngũ sản xuất & tiêu chuẩn nội dung',
    headingEn: 'The production team & content standards',
    teamVi: 'Đội ngũ sản xuất Unitrux',
    teamEn: 'Unitrux production team',
    bodyVi: 'Video trên trang này do đội ngũ sản xuất của Unitrux thực hiện — từ concept, kịch bản, quay, dựng đến bàn giao đa nền tảng. Ekip và studio đặt tại TP.HCM. Người đại diện theo pháp luật của Unitrux là ông Nguyễn Trung Đức.',
    bodyEn: 'The videos on this page are produced by the Unitrux production team — from concept and script through filming, editing and multi-platform delivery. The crew and studio are based in Ho Chi Minh City. Unitrux’s legal representative is Mr. Nguyễn Trung Đức.',
    // TODO: name(s) + role(s) + years of production experience of the people
    // who lead shoots and post-production, if Unitrux wants them credited.
    leadCreditTodo: TODO,
    link: contentStandardsLink,
  },

  '/product-photography': {
    headingVi: 'Đội ngũ & tiêu chuẩn hình ảnh',
    headingEn: 'The team & image standards',
    teamVi: 'Đội ngũ nhiếp ảnh Unitrux',
    teamEn: 'Unitrux photography team',
    bodyVi: 'Hình ảnh trên trang này do đội ngũ nhiếp ảnh của Unitrux thực hiện — từ brief, khảo sát, buổi chụp đến hậu kỳ và bàn giao theo từng kênh. Studio đặt tại TP.HCM. Người đại diện theo pháp luật của Unitrux là ông Nguyễn Trung Đức.',
    bodyEn: 'The images on this page are produced by the Unitrux photography team — from brief and survey through the shoot to post-production and per-channel delivery. The studio is based in Ho Chi Minh City. Unitrux’s legal representative is Mr. Nguyễn Trung Đức.',
    leadCreditTodo: TODO,
    link: contentStandardsLink,
  },
};

export const getServiceExpert = (path) => serviceExperts[path] || null;
