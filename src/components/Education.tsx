import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiBookOpen, FiMapPin, FiAward } from "react-icons/fi";

const EducationSection = styled.section`
  padding: 100px 0;
  background: white;
  color: #1a202c;
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
  color: #1a202c;
`;

const EducationCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  max-width: 600px;
  margin: 0 auto;
`;

const Degree = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const University = styled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  color: #667eea;
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
  color: #718096;
`;

const TrackInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
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
  color: #667eea;
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
          <Degree>Bachelor of Science in Information Technology</Degree>
          <University>University of Cincinnati</University>

          <EducationMeta>
            <MetaItem>
              <FiMapPin />
              Cincinnati, OH
            </MetaItem>
            <MetaItem>
              <FiBookOpen />
              2019 - 2023
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
