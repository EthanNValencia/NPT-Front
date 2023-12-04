export const WeekDays = {
  Sat: "Sat",
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sun: "Sun",
};

export const TextType = {
  PARAGRAPH: "PARAGRAPH",
  QUOTE: "QUOTE",
  IMAGE: "IMAGE",
};

export const Profile = {
  linkedin: "",
  youtube: "",
  facebook: "",
  myspace: "",
  instagram: "",
  yelp: "",
  tiktok: "",
  x: "",
  pinterest: "",
  snapchat: "",
  whatsapp: "",
  tumblr: "",
  google: "",
  id: 1,
};

export const BiographicalText = {
  id: null,
  type: TextType.PARAGRAPH,
  position: null,
  text: "",
};

export const InformationalText = {
  id: null,
  type: TextType.PARAGRAPH,
  position: null,
  text: "",
};

export const NewSchedule = [
  { id: null, day: WeekDays.Sat, beginTime: "00:00:00", endTime: "00:00:00" },
  { id: null, day: WeekDays.Mon, beginTime: "07:00:00", endTime: "18:30:00" },
  { id: null, day: WeekDays.Wed, beginTime: "07:00:00", endTime: "18:30:00" },
  { id: null, day: WeekDays.Thu, beginTime: "07:00:00", endTime: "18:30:00" },
  { id: null, day: WeekDays.Fri, beginTime: "13:00:00", endTime: "15:00:00" },
  { id: null, day: WeekDays.Tue, beginTime: "07:00:00", endTime: "18:30:00" },
  { id: null, day: WeekDays.Sun, beginTime: "00:00:00", endTime: "00:00:00" },
];

export const NewOffice = {
  officeId: null,
  street: "",
  unit: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  fax: "",
  email: "",
  acceptingWalkIns: false,
  mapUrl: "",
  introduction: "",
  officeSocialMedialProfile: Profile,
  schedule: NewSchedule,
  employees: [],
};

export const NewEmployee = {
  id: null,
  firstName: "",
  middleName: "",
  lastName: "",
  img: "",
  role_id: "",
  role: "",
  meta: "",
  email: "",
  workPhone: "",
  personalPhone: "",
  subject: "",
  possessive: "",
  services: [],
  appointments: [],
  schedule: NewSchedule,
  office: NewOffice,
  employeeContent: null,
  profile: Profile,
  biographicalTexts: [],
  informationalTexts: [],
};
