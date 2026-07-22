import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiBriefcase } from "react-icons/fi";

const ExperienceSection = styled.section`
  padding: 100px 0;
  background: var(--bg);
  color: var(--text);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--text);
`;

const ExperienceGrid = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ExperienceCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  transition: background 0.3s ease;

  &:hover {
    background: #252527;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const JobDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const Responsibilities = styled.ul`
  list-style: none;
  padding: 0;
`;

const Responsibility = styled.li`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    color: var(--text-secondary);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "IT Analyst",
      company: "Encore Technologies",
      location: "Cincinnati, OH",
      period: "Sep 2025 - Present",
      description:
        "Provide IT support for Cincinnati Children's Hospital while developing applications for the IT department.",
      responsibilities: [
        "Develop internal applications for the IT department, including a Power Apps barcode-scanning tool that cross-references SharePoint to streamline hardware refresh cycles",
        "Provide day-to-day IT support for Cincinnati Children's Hospital staff and systems",
      ],
    },
    {
      title: "Software Engineer 2",
      company: "Kardex Remstar",
      location: "Cincinnati, OH",
      period: "Jul 2023 - Jul 2024",
      description:
        "Developed and tested features for AutoStore automated storage and retrieval systems on an Agile team.",
      responsibilities: [
        "Built features across a React frontend and C#/.NET backend with SQL Server persistence",
        "Validated changes daily against an in-house miniature AutoStore hardware simulation grid",
        "Ran weekend production deployments at customer sites, monitoring logs to ensure smooth rollouts",
      ],
    },
    {
      title: "Software Engineer 3",
      company: "KPI Solutions",
      location: "Cincinnati, OH",
      period: "Jan 2022 - Jun 2023",
      description:
        "Built features for AutoStore warehouse automation systems on an Agile team.",
      responsibilities: [
        "Developed features across an Angular frontend and Java Spring Boot backend with SQL Server persistence",
        "Tested throughout the day against an in-house AutoStore hardware simulation grid",
        "Handled weekend on-site production deployments with live log monitoring at customer facilities",
      ],
    },
    {
      title: "IT Support Technician",
      company: "University of Cincinnati — Lindner College of Business",
      location: "Cincinnati, OH",
      period: "Apr 2021 - Dec 2021",
      description:
        "Provided IT support for faculty, staff, and classroom technology in the Lindner College of Business IT department.",
      responsibilities: [
        "Developed a web-based display for the IT department to monitor classroom camera streams",
        "Troubleshot audio/video and network issues in classrooms",
        "Handled level-one service tickets via the ServiceNow ticketing system",
      ],
    },
  ];

  return (
    <ExperienceSection id="experience">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </SectionTitle>

        <ExperienceGrid>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <JobTitle>{experience.title}</JobTitle>
              <Company>{experience.company}</Company>

              <JobMeta>
                <MetaItem>
                  <FiCalendar />
                  {experience.period}
                </MetaItem>
                <MetaItem>
                  <FiMapPin />
                  {experience.location}
                </MetaItem>
                <MetaItem>
                  <FiBriefcase />
                  Full-time
                </MetaItem>
              </JobMeta>

              <JobDescription>{experience.description}</JobDescription>

              <Responsibilities>
                {experience.responsibilities.map((responsibility, idx) => (
                  <Responsibility key={idx}>{responsibility}</Responsibility>
                ))}
              </Responsibilities>
            </ExperienceCard>
          ))}
        </ExperienceGrid>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
