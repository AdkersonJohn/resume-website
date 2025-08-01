import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiCode, FiTool, FiUsers, FiDatabase } from "react-icons/fi";

const SkillsSection = styled.section`
  padding: 100px 0;
  background: #f8fafc;
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SkillCategory = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a202c;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const SkillName = styled.span`
  font-weight: 500;
  color: #4a5568;
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const SkillDot = styled.div<{ filled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ filled }) => (filled ? "#667eea" : "#e2e8f0")};
`;

const AdditionalSkills = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  max-width: 800px;
  margin: 0 auto;
`;

const AdditionalSkillsTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a202c;
`;

const SkillsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

const SkillTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <FiCode />,
      skills: [
        { name: "Java (17+)", level: 5 },
        { name: "C#", level: 4 },
        { name: "Python", level: 4 },
        { name: "JavaScript/TypeScript", level: 4 },
        { name: "C++", level: 3 },
      ],
    },
    {
      title: "Frameworks & Technologies",
      icon: <FiTool />,
      skills: [
        { name: "Spring 6.x / Spring Boot 3.x", level: 5 },
        { name: "ASP.NET", level: 4 },
        { name: "Angular/AngularJS", level: 4 },
        { name: "React", level: 4 },
        { name: "REST APIs", level: 5 },
      ],
    },
    {
      title: "Development Tools",
      icon: <FiDatabase />,
      skills: [
        { name: "Git/GitHub/GitLab", level: 5 },
        { name: "Jenkins/JFrog", level: 4 },
        { name: "VSCode/IntelliJ", level: 5 },
        { name: "Visual Studio", level: 4 },
        { name: "Jira/Bitbucket", level: 4 },
      ],
    },
    {
      title: "Database & DevOps",
      icon: <FiUsers />,
      skills: [
        { name: "T-SQL/RDBMS", level: 4 },
        { name: "Azure", level: 4 },
        { name: "Agile/Scrum", level: 5 },
        { name: "Test-Driven Development", level: 4 },
        { name: "Object-Oriented Design", level: 4 },
      ],
    },
  ];

  const additionalSkills = [
    "Bash/Swift Scripting",
    "HTML/CSS",
    "SOAP APIs",
    "Swagger Documentation",
    "Freshdesk",
    "Remote Desktop Manager",
    "ServiceNow",
    "Complex Problem Solving",
    "Web-based Solutions",
    "Cloud Technologies",
  ];

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </SectionTitle>

        <SkillsGrid>
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>

              <SkillsList>
                {category.skills.map((skill, idx) => (
                  <SkillItem key={idx}>
                    <SkillName>{skill.name}</SkillName>
                    <SkillLevel>
                      {[...Array(5)].map((_, i) => (
                        <SkillDot key={i} filled={i < skill.level} />
                      ))}
                    </SkillLevel>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>

        <AdditionalSkills
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <AdditionalSkillsTitle>Additional Skills</AdditionalSkillsTitle>
          <SkillsTags>
            {additionalSkills.map((skill, index) => (
              <SkillTag key={index}>{skill}</SkillTag>
            ))}
          </SkillsTags>
        </AdditionalSkills>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
