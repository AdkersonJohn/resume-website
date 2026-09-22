import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text);
  padding: 100px 20px 50px;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const Greeting = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: var(--text-secondary);
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: var(--text-secondary);
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  border-radius: 980px;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: #f5f5f7;
  color: #000;

  &:hover {
    background: #d5d5d9;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.2rem;
  transition: background 0.3s ease;

  &:hover {
    background: var(--chip-hover);
  }
`;

const Hero: React.FC = () => {
  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroSection id="about">
      <HeroContent>
        <Greeting
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm
        </Greeting>

        <Name
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          John Adkerson
        </Name>

        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Software Developer & IT Support Specialist
        </Title>

        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Software developer and IT support specialist currently supporting
          Cincinnati Children's Hospital, with hands-on Power Platform
          development — including a Power Apps and SharePoint Online solution
          in active use for hardware refresh operations. Two and a half years
          of prior software engineering experience building full-stack
          features with React, Angular, C#/.NET, Java Spring Boot, REST APIs,
          and SQL Server on Agile teams. Alongside that, ships and maintains
          independent mobile and web products — iOS, Android and watchOS apps
          released through the App Store, TestFlight and Expo EAS — built with
          React Native, Capacitor and SwiftUI. Comfortable working with both
          technical teams and non-technical end users, translating day-to-day
          pain points into working applications.
        </Description>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button className="secondary" onClick={handleContact}>
            <FiMail />
            Get In Touch
          </Button>
        </ButtonGroup>

        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <SocialLink
            href="https://github.com/AdkersonJohn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/john-adkerson-63a0171b0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </SocialLink>
        </SocialLinks>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
