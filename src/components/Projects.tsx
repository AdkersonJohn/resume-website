import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiCode, FiTerminal, FiSettings } from "react-icons/fi";

const ProjectsSection = styled.section`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProjectIcon = styled.div`
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

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a202c;
`;

const ProjectDescription = styled.p`
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Classroom Monitoring Interface",
      technology: "JavaScript",
      icon: <FiCode />,
      description:
        "Created a web-based display for the IT department to monitor classroom camera streams, showcasing frontend development and user interface design skills.",
      techStack: ["JavaScript", "HTML/CSS", "Web Development", "UI/UX"],
    },
    {
      title: "Proctor Camera Centering System",
      technology: "Bash",
      icon: <FiTerminal />,
      description:
        "Implemented a classroom proctor camera centering system scheduled nightly via Task Scheduler, highlighting scripting and automation capabilities.",
      techStack: [
        "Bash Scripting",
        "Task Scheduler",
        "Automation",
        "System Administration",
      ],
    },
    {
      title: "Jira Issue Tagging System",
      technology: "DevOps",
      icon: <FiSettings />,
      description:
        "Designed a Jira issue tagging system to streamline customer production upgrades, demonstrating skills in DevOps and process improvement.",
      techStack: ["Jira", "DevOps", "Process Improvement", "Automation"],
    },
  ];

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </SectionTitle>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectHeader>
                <ProjectIcon>{project.icon}</ProjectIcon>
                <div>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <TechTag>{project.technology}</TechTag>
                </div>
              </ProjectHeader>

              <ProjectDescription>{project.description}</ProjectDescription>

              <ProjectTech>
                {project.techStack.map((tech, idx) => (
                  <TechTag key={idx}>{tech}</TechTag>
                ))}
              </ProjectTech>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
