import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    oracle,
    html,
    css,
    reactjs,
    tensorflow,
    postgres,
    spark,
    aws,
    git,
    pandas,
    docker,
    indra,
    hatchworks,
    zenta,
    taxtech,
    carrent,
    jobit,
    tripguide,
    python,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Backend Developer",
      icon: web,
    },
    {
      title: "Flutter Developer",
      icon: mobile,
    },
    {
      title: "Data Engineer",
      icon: backend,
    },
    {
      title: "ML Engineer",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tensorflow",
      icon: tensorflow,
    },
    {
      name: "Oracle",
      icon: oracle,
    },
    {
      name: "Postgres",
      icon: postgres,
    },
    {
      name: "Spark",
      icon: spark,
    },
    {
      name: "AWS",
      icon: aws,
    },
    {
      name: "Python",
      icon: python,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "Pandas",
      icon: pandas,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Senior Data Engineer",
      company_name: "HatchWorks (US)",
      icon: hatchworks,
      iconBg: "#FBF6F5",
      date: "Nov 2021 - Present",
      points: [
        "Use of native cloud services in AWS to create data pipelines in serverless-based architectures for our client Trueblue.",
        "Designing and implementing Even Driven architectures for our data pipelines in AWS",
        "Working extensively with CI/CD solutions in AWS and GitHub",
        "Participating in code reviews and providing constructive feedback to other developers.",
        "Developing Recomender systems using cutting-edge ML models"
      ],
    },
    {
      title: "Data Engineer",
      company_name: "Zenta Group (Chile)",
      icon: zenta,
      iconBg: "#FBF6F5",
      date: "Aug 2021 - Jan 2022",
      points: [
        "Making available data to the business areas by building data pipelines with Apache Airflow",
        "Building on-demand reports in Metabase for the Sales area in Cencosud",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products."
      ],
    },
    {
      title: "Cloud Developer",
      company_name: "TaxTech (Perú)",
      icon: taxtech,
      iconBg: "#FBF6F5",
      date: "Feb 2020 - Jul 2021",
      points: [
        "Automating of processes related to accounting electronic books established for SUNAT (Goverment Entity)",
        "Creating Event-Driven and serverless architectures for ETL processes using big data services in AWS such us: Glue, Lake Formation, Athena, and EMR.",
        "Developing ETL solutions using the capabilities of bash script over on-premise infrastructure (Linux, Oracle, AWK commands)",
        "Collaborating with cross-functional teams including Accountants and Developers to create state-of-the-art solutions."

      ],
    },
    {
      title: "Scrum Developer",
      company_name: "Indra (Perú)",
      icon: indra,
      iconBg: "#FBF6F5",
      date: "May 2019 - Oct 2019",
      points: [
        "Developing and maintaining web applications for an Insurance Company",
        "Agile development with Scrum methodology",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Troubleshooting bugs and creating new features for microservices in the Portal application",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "Giancarlo is a talented professional with extensive experience in solution development, data analytics, and team leadership. He has a broad range of skills and techniques in technology, which makes him an ideal prospect for any company...",
      name: "Jhonny G. Murayari",
      designation: "Analista Funcioal TI",
      company: "Grupo AJE",
      image: "https://media.licdn.com/dms/image/C4E03AQEjkUWxIryL6A/profile-displayphoto-shrink_200_200/0/1613406119847?e=1693440000&v=beta&t=om0brWM9yKME-P5z5QfEEKKrr_w_yVbHWx9v_tu9kqY",
    },
    {
      testimonial:
        "Giancarlo es un profesional proactivo, responsable y con mucha creatividad. Siempre tiene una receta para cada problema. Está constantemente poniéndose a prueba con nuevos retos, y así afinar sus habilidades.",
      name: "Christian Rivera",
      designation: "Software Engineer",
      company: "Globant",
      image: "https://media.licdn.com/dms/image/D4E03AQHXaZbLR5Q63A/profile-displayphoto-shrink_200_200/0/1668215656078?e=1693440000&v=beta&t=rKLaBUxoB6CuZuz264deLvFwKBfWZbaNXiLR448V7pg",
    },
    {
      testimonial:
        "Giancarlo es una excelente persona con un alto grado de implicación y una marcada proactividad, siempre se muestra abierto a los cambios, tiene amplios conocimientos en programación y análisis de datos.",
      name: "Juan C. Castillo",
      designation: "Software Engineer",
      company: "Compartamos Financiera",
      image: "https://media.licdn.com/dms/image/D4E03AQFMT4fL5nJyeA/profile-displayphoto-shrink_200_200/0/1675563537133?e=1693440000&v=beta&t=rnQU0Ra8vVI5QW87IkXlw7FQ6pQAdVdtDS3Fdh2ZpF0",
    },
  ];
  
  const projects = [
    {
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };