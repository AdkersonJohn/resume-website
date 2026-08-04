import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiCode, FiTool, FiUsers, FiDatabase, FiPackage } from "react-icons/fi";

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SkillCategory = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
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
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
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
  color: var(--text-secondary);
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const SkillDot = styled.div<{ $filled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $filled }) => ($filled ? "var(--text)" : "var(--chip)")};
`;

const AdditionalSkills = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  max-width: 800px;
  margin: 0 auto;
`;

const AdditionalSkillsTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text);
`;

const SkillsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

const SkillTag = styled.span`
  background: var(--chip);
  color: var(--text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Warehouse Automation",
      icon: <FiPackage />,
      skills: [
        { name: "AutoStore ASRS", level: 4 },
        { name: "WMS/WMI Integration", level: 4 },
        { name: "Production Installs & Go-Lives", level: 4 },
        { name: "Hardware Simulation Testing", level: 4 },
      ],
    },
    {
      title: "Programming Languages",
      icon: <FiCode />,
      skills: [
        { name: "Java (17+)", level: 4 },
        { name: "C#", level: 4 },
        { name: "Python", level: 3 },
        { name: "JavaScript/TypeScript", level: 4 },
        { name: "C++", level: 3 },
      ],
    },
    {
      title: "Frameworks & Technologies",
      icon: <FiTool />,
      skills: [
        { name: "Spring 6.x / Spring Boot 3.x", level: 4 },
        { name: "ASP.NET", level: 3 },
        { name: "Angular/AngularJS", level: 4 },
        { name: "React", level: 5 },
        { name: "REST APIs", level: 4 },
      ],
    },
    {
      title: "Development Tools",
      icon: <FiDatabase />,
      skills: [
        { name: "Git/GitHub/GitLab", level: 4 },
        { name: "Jenkins/JFrog", level: 4 },
        { name: "VSCode/IntelliJ", level: 4 },
        { name: "Visual Studio", level: 4 },
        { name: "Jira/Bitbucket", level: 4 },
      ],
    },
    {
      title: "Database & DevOps",
      icon: <FiUsers />,
      skills: [
        { name: "T-SQL/RDBMS", level: 4 },
        { name: "Azure", level: 3 },
        { name: "Agile/Scrum", level: 4 },
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
                        <SkillDot
                          key={i}
                          $filled={i < skill.level}
                          data-filled={i < skill.level}
                        />
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
