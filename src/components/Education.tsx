import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiBookOpen, FiMapPin, FiAward } from "react-icons/fi";

const EducationSection = styled.section`
  padding: 100px 0;
  background: var(--surface-alt);
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

const EducationCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  max-width: 600px;
  margin: 0 auto;
`;

const Degree = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const University = styled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const EducationMeta = styled.div`
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

const TrackInfo = styled.div`
  background: var(--chip);
  color: var(--text);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const TrackTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TrackDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const GPA = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text);
  font-size: 1.1rem;
`;

const Education: React.FC = () => {
  return (
    <EducationSection id="education">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education
        </SectionTitle>

        <EducationCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Degree>Bachelor's Degree in Computer Software Engineering</Degree>
          <University>University of Cincinnati</University>

          <EducationMeta>
            <MetaItem>
              <FiMapPin />
              Cincinnati, OH
            </MetaItem>
            <MetaItem>
              <FiBookOpen />
              Aug 2019 - May 2021
            </MetaItem>
          </EducationMeta>

          <TrackInfo>
            <TrackTitle>Track Focus: Software Development</TrackTitle>
            <TrackDescription>
              Specialized in software development with comprehensive coursework
              in programming, web development, database management, and software
              engineering principles.
            </TrackDescription>
          </TrackInfo>

          <GPA>
            <FiAward />
            GPA: 3.74
          </GPA>
        </EducationCard>
      </Container>
    </EducationSection>
  );
};

export default Education;
