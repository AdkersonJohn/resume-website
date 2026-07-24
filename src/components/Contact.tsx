import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

const ContactSection = styled.section`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ContactCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  text-align: center;
  transition: background 0.3s ease;

  &:hover {
    background: var(--surface-hover);
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const ContactLink = styled.a`
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
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

const Contact: React.FC = () => {
  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </SectionTitle>

        <ContactGrid>
          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ContactIcon>
              <FiMail />
            </ContactIcon>
            <ContactTitle>Email</ContactTitle>
            <ContactInfo>
              <ContactLink href="mailto:john.adkerson.software@gmail.com">
                john.adkerson.software@gmail.com
              </ContactLink>
            </ContactInfo>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactIcon>
              <FiPhone />
            </ContactIcon>
            <ContactTitle>Phone</ContactTitle>
            <ContactInfo>
              <ContactLink href="tel:513.802.8191">513.802.8191</ContactLink>
            </ContactInfo>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ContactIcon>
              <FiMapPin />
            </ContactIcon>
            <ContactTitle>Location</ContactTitle>
            <ContactInfo>
              95 Kentucky Drive
              <br />
              Newport, Kentucky 41071
            </ContactInfo>
          </ContactCard>
        </ContactGrid>

        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <SocialLink
            href="https://github.com/AdkersonJohn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/john-adkerson-63a0171b0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin />
          </SocialLink>
        </SocialLinks>
      </Container>
    </ContactSection>
  );
};

export default Contact;
