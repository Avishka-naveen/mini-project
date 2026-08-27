import profile from '../assets/profile-pic.png';

 const servicesDummyData = [
  {
    _id: "service001",
    title: "Plumbing Service",
    description: "Fix pipe leaks and install plumbing fixtures",
    price: 3000,
    workerDetails: {
      _id: "worker001",
      name: "Sunil Perera",
      email: "sunil@gmail.com",
      location: "Colombo",
      phone: "0771234567",
      profileImage: profile,
    },
    skills: "Pipe installation, leak detection, bathroom fittings, water tank maintenance.",
    comments: [
      {
        _id: "comment001",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment002",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment003",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment004",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment005",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment005",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment005",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment005",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment005",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment005",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
       {
        _id: "comment005",
        userId: "user001",
        comment: "Excellent plumbing service!",
        date: "2026-07-10",
      },
    ],
  },
  {
    _id: "service002",
    title: "Electrical Repair",
    description: "Repair electrical wiring and install switches",
    price: 3500,
    workerDetails: {
      _id: "worker002",
      name: "Kasun Silva",
      email: "kasun@gmail.com",
      location: "Negombo",
      phone: "0712345678",
      profileImage: profile,
    },
    skills: "House wiring, circuit breakers, lighting installation, electrical troubleshooting.",
    comments: [
      {
        _id: "comment002",
        userId: "user002",
        comment: "Professional electrician.",
        date: "2026-07-09",
      },
    ],
  },
  {
    _id: "service003",
    title: "Carpentry Service",
    description: "Furniture repair and custom woodwork",
    price: 4500,
    workerDetails: {
      _id: "worker003",
      name: "Nimal Fernando",
      email: "nimal@gmail.com",
      location: "Gampaha",
      phone: "0756789123",
      profileImage: profile,
    },
    skills: "Furniture making, cabinet installation, wood finishing, door repairs.",
    comments: [
      {
        _id: "comment003",
        userId: "user003",
        comment: "Very skilled carpenter.",
        date: "2026-07-08",
      },
    ],
  },
  {
    _id: "service004",
    title: "House Cleaning",
    description: "Complete home and office cleaning services",
    price: 2500,
    workerDetails: {
      _id: "worker004",
      name: "Amali Perera",
      email: "amali@gmail.com",
      location: "Kandy",
      phone: "0765432198",
      profileImage: profile,
    },
    skills: "Deep cleaning, office cleaning, carpet cleaning, sanitization.",
    comments: [
      {
        _id: "comment004",
        userId: "user004",
        comment: "Very clean and punctual.",
        date: "2026-07-07",
      },
    ],
  },
  {
    _id: "service005",
    title: "Painting Service",
    description: "Interior and exterior painting",
    price: 5000,
    workerDetails: {
      _id: "worker005",
      name: "Ruwan Jayasinghe",
      email: "ruwan@gmail.com",
      location: "Kurunegala",
      phone: "0787654321",
      profileImage: profile,
    },
    skills: "Wall painting, texture painting, waterproof coatings, color consultation.",
    comments: [
      {
        _id: "comment005",
        userId: "user005",
        comment: "Beautiful painting work.",
        date: "2026-07-06",
      },
    ],
  },
  {
    _id: "service006",
    title: "Air Conditioner Repair",
    description: "AC installation, repair, and maintenance",
    price: 6000,
    workerDetails: {
      _id: "worker006",
      name: "Dinesh Kumara",
      email: "dinesh@gmail.com",
      location: "Matara",
      phone: "0741122334",
      profileImage: profile,
    },
    skills: "AC servicing, gas refilling, installation, cooling system repair.",
    comments: [
      {
        _id: "comment006",
        userId: "user006",
        comment: "My AC works perfectly now.",
        date: "2026-07-05",
      },
    ],
  },
  {
    _id: "service007",
    title: "Gardening Service",
    description: "Garden maintenance and landscaping",
    price: 2800,
    workerDetails: {
      _id: "worker007",
      name: "Chamara Wijesinghe",
      email: "chamara@gmail.com",
      location: "Kalutara",
      phone: "0779988776",
      profileImage: profile,
    },
    skills: "Lawn mowing, tree trimming, landscaping, plant care.",
    comments: [
      {
        _id: "comment007",
        userId: "user007",
        comment: "Garden looks amazing!",
        date: "2026-07-04",
      },
    ],
  },
  {
    _id: "service008",
    title: "Home Security Installation",
    description: "Install CCTV cameras and alarm systems",
    price: 12000,
    workerDetails: {
      _id: "worker008",
      name: "Sampath De Silva",
      email: "sampath@gmail.com",
      location: "Colombo",
      phone: "0719988776",
      profileImage: profile,
    },
    skills: "CCTV installation, alarm setup, networking, surveillance systems.",
    comments: [
      {
        _id: "comment008",
        userId: "user008",
        comment: "Highly recommended.",
        date: "2026-07-03",
      },
    ],
  },
  {
    _id: "service009",
    title: "Computer Repair",
    description: "Desktop and laptop repair services",
    price: 4000,
    workerDetails: {
      _id: "worker009",
      name: "Tharindu Senanayake",
      email: "tharindu@gmail.com",
      location: "Galle",
      phone: "0754455667",
      profileImage: profile,
    },
    skills: "Hardware repair, Windows installation, virus removal, upgrades.",
    comments: [
      {
        _id: "comment009",
        userId: "user009",
        comment: "Laptop repaired within one day.",
        date: "2026-07-02",
      },
    ],
  },
  {
    _id: "service010",
    title: "Tile Installation",
    description: "Floor and wall tile installation",
    price: 7000,
    workerDetails: {
      _id: "worker010",
      name: "Pradeep Fernando",
      email: "pradeep@gmail.com",
      location: "Anuradhapura",
      phone: "0723344556",
      profileImage: profile,
    },
    skills: "Ceramic tiles, porcelain tiles, grouting, floor leveling.",
    comments: [
      {
        _id: "comment010",
        userId: "user010",
        comment: "Excellent tile finishing.",
        date: "2026-07-01",
      },
    ],
  },
];

export default servicesDummyData;

const bookingDummyData = [
  {
    _id: "booking001",
    workerId: "worker003",
    serviceId: "service003",
    customerId: "user001",
    date: "2026-12-02",
    status: "In Progress"
  },
  {
    _id: "booking002",
    workerId: "worker002",
    serviceId: "service002",
    customerId: "user002",
    date: "2026-12-05",
    status: "Confirmed"
  },
  {
    _id: "booking003",
    workerId: "worker006",
    serviceId: "service006",
    customerId: "user003",
    date: "2026-12-08",
    status: "Completed"
  },
  {
    _id: "booking004",
    workerId: "worker001",
    serviceId: "service001",
    customerId: "user004",
    date: "2026-12-10",
    status: "Cancelled"
  },
  {
    _id: "booking005",
    workerId: "worker005",
    serviceId: "service005",
    customerId: "user005",
    date: "2026-12-12",
    status: "Pending"
  },
  {
    _id: "booking006",
    workerId: "worker004",
    serviceId: "service004",
    customerId: "user006",
    date: "2026-12-15",
    status: "Confirmed"
  },
  {
    _id: "booking007",
    workerId: "worker007",
    serviceId: "service007",
    customerId: "user007",
    date: "2026-12-18",
    status: "Completed"
  },
  {
    _id: "booking008",
    workerId: "worker008",
    serviceId: "service008",
    customerId: "user008",
    date: "2026-12-20",
    status: "Pending"
  },
  {
    _id: "booking009",
    workerId: "worker009",
    serviceId: "service009",
    customerId: "user009",
    date: "2026-12-22",
    status: "Confirmed"
  },
  {
    _id: "booking010",
    workerId: "worker010",
    serviceId: "service010",
    customerId: "user010",
    date: "2026-12-25",
    status: "Completed"
  }
];
export { bookingDummyData };

const serviceDummyData = [
  {
    service_id: "service001",
    workerId: "worker001",
    price: 5000,
    location: "Colombo",
    description: "Professional plumbing service for home and office repairs.",
    phone: "0771234567",
    service_name: "Plumbing Service",
    skill: "Plumber,plumber2"
  },

  {
    service_id: "service002",
    workerId: "worker002",
    price: 3500,
    location: "Negombo",
    description: "Electrical installation and repair services with experienced workers.",
    phone: "0719876543",
    service_name: "Electrical Repair",
    skill: "Electrician"
  },

  {
    service_id: "service003",
    workerId: "worker003",
    price: 4500,
    location: "Chilaw",
    description: "Custom furniture making and wood repair services.",
    phone: "0754567890",
    service_name: "Carpenter Service",
    skill: "Carpenter"
  },

  {
    service_id: "service004",
    workerId: "worker004",
    price: 6000,
    location: "Kandy",
    description: "Professional house painting service with quality materials.",
    phone: "0765554433",
    service_name: "House Painting",
    skill: "Painter"
  },

  {
    service_id: "service005",
    workerId: "worker005",
    price: 3000,
    location: "Gampaha",
    description: "Complete home and office cleaning service.",
    phone: "0782223344",
    service_name: "Cleaning Service",
    skill: "Cleaner"
  },

  {
    service_id: "service006",
    workerId: "worker006",
    price: 7500,
    location: "Colombo",
    description: "Air conditioner installation, repair and maintenance.",
    phone: "0701112233",
    service_name: "AC Repair Service",
    skill: "Air Conditioning Technician"
  }
];

export {serviceDummyData};


const workersDummyData = [
  {
    workerId: "worker001",
    name: "Sunil Perera",
    details: "Experienced ",
    created_at: "2026-01-10",
  },
  {
    workerId: "worker002",
    name: "Kasun Silva",
    details: "Certified ",
    created_at: "2026-01-15",
  },
  {
    workerId: "worker003",
    name: "Nimal Fernando",
    details: "Professional ",
    created_at: "2026-02-01",
  },
  {
    workerId: "worker004",
    name: "Amali Perera",
    details: "Experienced ",
    created_at: "2026-02-12",
  },
  {
    workerId: "worker005",
    name: "Ruwan Jayasinghe",
    details: "Expert ",
    created_at: "2026-03-05",
  },
  {
    workerId: "worker006",
    name: "Avishka",
    details: "Air conditioning ",
    created_at: "2026-03-20",
  },
  {
    workerId: "worker007",
    name: "Chamara Wijesinghe",
    details: "Professional ",
    created_at: "2026-04-08",
  },
  {
    workerId: "worker008",
    name: "Sampath De Silva",
    details: "Security ",
    created_at: "2026-04-22",
  },
  {
    workerId: "worker009",
    name: "Tharindu Senanayake",
    details: "Computer",
    created_at: "2026-05-14",
  },
  {
    workerId: "worker010",
    name: "Pradeep Fernando",
    details: "Tile ",
    created_at: "2026-06-01",
  },
];

export  {workersDummyData};



const usersDummmyData = [
  {
    id: "user001",
    name: "Nuwan Perera",
    joined_at: "2026-01-05",
  },
  {
    id: "user002",
    name: "Kasuni Silva",
    joined_at: "2026-01-12",
  },
  {
    id: "user003",
    name: "Amila Fernando",
    joined_at: "2026-01-25",
  },
  {
    id: "user004",
    name: "Dilani Jayawardena",
    joined_at: "2026-02-03",
  },
  {
    id: "user005",
    name: "Tharindu Senanayake",
    joined_at: "2026-02-15",
  },
  {
    id: "user006",
    name: "Nethmi Perera",
    joined_at: "2026-03-01",
  },
  {
    id: "user007",
    name: "Sahan Kumara",
    joined_at: "2026-03-18",
  },
  {
    id: "user008",
    name: "Piumi De Silva",
    joined_at: "2026-04-02",
  },
  {
    id: "user009",
    name: "Ravindu Wickramasinghe",
    joined_at: "2026-04-20",
  },
  {
    id: "user010",
    name: "Sanduni Fernando",
    joined_at: "2026-05-10",
  },
];

export {usersDummmyData};

const dummybookingData = [
  {
    id: "booking001",
    workerName: "Sunil Perera",
    customerName: "Nuwan Perera",
    serviceName: "Plumbing Service",
    bookingDate: "2026-07-20",
    status: "Pending",
  },
  {
    id: "booking002",
    workerName: "Kasun Silva",
    customerName: "Kasuni Silva",
    serviceName: "Electrical Repair",
    bookingDate: "2026-07-21",
    status: "Confirmed",
  },
  {
    id: "booking003",
    workerName: "Nimal Fernando",
    customerName: "Amila Fernando",
    serviceName: "Carpentry Service",
    bookingDate: "2026-07-22",
    status: "In Progress",
  },
  {
    id: "booking004",
    workerName: "Amali Perera",
    customerName: "Dilani Jayawardena",
    serviceName: "House Cleaning",
    bookingDate: "2026-07-23",
    status: "Completed",
  },
  {
    id: "booking005",
    workerName: "Ruwan Jayasinghe",
    customerName: "Tharindu Senanayake",
    serviceName: "Painting Service",
    bookingDate: "2026-07-24",
    status: "Cancelled",
  },
  {
    id: "booking006",
    workerName: "Avishka",
    customerName: "Nethmi Perera",
    serviceName: "Air Conditioner Repair",
    bookingDate: "2026-07-25",
    status: "Pending",
  },
  {
    id: "booking007",
    workerName: "Chamara Wijesinghe",
    customerName: "Sahan Kumara",
    serviceName: "Gardening Service",
    bookingDate: "2026-07-26",
    status: "Confirmed",
  },
  {
    id: "booking008",
    workerName: "Sampath De Silva",
    customerName: "Piumi De Silva",
    serviceName: "Home Security Installation",
    bookingDate: "2026-07-27",
    status: "Completed",
  },
  {
    id: "booking009",
    workerName: "Tharindu Senanayake",
    customerName: "Ravindu Wickramasinghe",
    serviceName: "Computer Repair",
    bookingDate: "2026-07-28",
    status: "In Progress",
  },
  {
    id: "booking010",
    workerName: "Pradeep Fernando",
    customerName: "Sanduni Fernando",
    serviceName: "Tile Installation",
    bookingDate: "2026-07-29",
    status: "Confirmed",
  },
];

export {dummybookingData };


const dummyManageServicesData = [
  {
    id: "001",
    service_id: "service001",
    workerId: "worker001",
    price: 3000,
    location: "Colombo",
    description: "Professional plumbing service for homes and offices.",
    phone: "0771234567",
    service_name: "Plumbing Service",
    skill: "Plumber",
    comment: [
      { id: "001", user: "user001", comment: "Excellent service." },
      { id: "002", user: "user002", comment: "Very professional." },
      { id: "003", user: "user003", comment: "Highly recommended." },
      { id: "001", user: "user001", comment: "Excellent service." },
      { id: "002", user: "user002", comment: "Very professional." },
      { id: "003", user: "user003", comment: "Highly recommended." },
           { id: "001", user: "user001", comment: "Excellent service." },
      { id: "002", user: "user002", comment: "Very professional." },
      { id: "003", user: "user003", comment: "Highly recommended." },
      { id: "001", user: "user001", comment: "Excellent service." },
      { id: "002", user: "user002", comment: "Very professional." },
      { id: "003", user: "user003", comment: "Highly recommended." },
           { id: "001", user: "user001", comment: "Excellent service." },
      { id: "002", user: "user002", comment: "Very professional." },
      { id: "003", user: "user003", comment: "Highly recommended." },
      { id: "001", user: "user001", comment: "Excellent service." },
      { id: "002", user: "user002", comment: "Very professional." },
      { id: "003", user: "user003", comment: "Highly recommended." },
      
      
      
    ],
  },
  {
    id: "002",
    service_id: "service002",
    workerId: "worker002",
    price: 3500,
    location: "Negombo",
    description: "Electrical repairs and wiring installation.",
    phone: "0712345678",
    service_name: "Electrical Repair",
    skill: "Electrician",
    comment: [
      { id: "004", user: "user004", comment: "Quick response." },
      { id: "005", user: "user005", comment: "Solved my issue." },
      { id: "006", user: "user006", comment: "Friendly worker." },
    ],
  },
  {
    id: "003",
    service_id: "service003",
    workerId: "worker003",
    price: 4500,
    location: "Chilaw",
    description: "Custom furniture making and wood repair services.",
    phone: "0754567890",
    service_name: "Carpenter Service",
    skill: "Carpenter",
    comment: [
      { id: "007", user: "user007", comment: "Beautiful work." },
      { id: "008", user: "user008", comment: "Very skilled." },
      { id: "009", user: "user009", comment: "Worth the price." },
    ],
  },
  {
    id: "004",
    service_id: "service004",
    workerId: "worker004",
    price: 2500,
    location: "Kandy",
    description: "Home and office cleaning services.",
    phone: "0765432198",
    service_name: "Cleaning Service",
    skill: "Cleaner",
    comment: [
      { id: "010", user: "user010", comment: "Very clean work." },
      { id: "011", user: "user011", comment: "Punctual worker." },
      { id: "012", user: "user012", comment: "Satisfied." },
    ],
  },
  {
    id: "005",
    service_id: "service005",
    workerId: "worker005",
    price: 5000,
    location: "Kurunegala",
    description: "Interior and exterior painting services.",
    phone: "0787654321",
    service_name: "Painting Service",
    skill: "Painter",
    comment: [
      { id: "013", user: "user013", comment: "Amazing finish." },
      { id: "014", user: "user014", comment: "Neat painting." },
      { id: "015", user: "user015", comment: "Highly satisfied." },
    ],
  },
  {
    id: "006",
    service_id: "service006",
    workerId: "worker006",
    price: 6000,
    location: "Matara",
    description: "AC installation and repair services.",
    phone: "0741122334",
    service_name: "Air Conditioner Repair",
    skill: "AC Technician",
    comment: [
      { id: "016", user: "user016", comment: "Fast repair." },
      { id: "017", user: "user017", comment: "Cooling works well." },
      { id: "018", user: "user018", comment: "Professional." },
    ],
  },
  {
    id: "007",
    service_id: "service007",
    workerId: "worker007",
    price: 2800,
    location: "Kalutara",
    description: "Garden maintenance and landscaping.",
    phone: "0779988776",
    service_name: "Gardening Service",
    skill: "Gardener",
    comment: [
      { id: "019", user: "user019", comment: "Beautiful garden." },
      { id: "020", user: "user020", comment: "Very hardworking." },
      { id: "021", user: "user021", comment: "Excellent." },
    ],
  },
  {
    id: "008",
    service_id: "service008",
    workerId: "worker008",
    price: 12000,
    location: "Colombo",
    description: "CCTV and home security installation.",
    phone: "0719988776",
    service_name: "Home Security Installation",
    skill: "Security Technician",
    comment: [
      { id: "022", user: "user022", comment: "Secure setup." },
      { id: "023", user: "user023", comment: "Good quality." },
      { id: "024", user: "user024", comment: "Recommended." },
    ],
  },
  {
    id: "009",
    service_id: "service009",
    workerId: "worker009",
    price: 4000,
    location: "Galle",
    description: "Computer and laptop repair services.",
    phone: "0754455667",
    service_name: "Computer Repair",
    skill: "Computer Technician",
    comment: [
      { id: "025", user: "user025", comment: "Laptop fixed quickly." },
      { id: "026", user: "user026", comment: "Affordable." },
      { id: "027", user: "user027", comment: "Very knowledgeable." },
    ],
  },
  {
    id: "010",
    service_id: "service010",
    workerId: "worker010",
    price: 7000,
    location: "Anuradhapura",
    description: "Professional floor and wall tile installation.",
    phone: "0723344556",
    service_name: "Tile Installation",
    skill: "Tile Installer",
    comment: [
      { id: "028", user: "user028", comment: "Perfect finishing." },
      { id: "029", user: "user029", comment: "Quality work." },
      { id: "030", user: "user030", comment: "Would hire again." },
    ],
  },
];

export {dummyManageServicesData};