import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiShare2,
  FiActivity,
  FiTarget,
  FiShoppingBag,
  FiCamera,
  FiWatch,
  FiExternalLink,
} from "react-icons/fi";

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

const LiveLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #764ba2;
  }
`;

interface Project {
  title: string;
  technology: string;
  icon: React.ReactElement;
  description: string;
  techStack: string[];
  liveUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Camp Scout",
      technology: "Full-Stack SaaS",
      icon: <FiMapPin />,
      description:
        "Full-stack campsite monitoring and auto-booking platform for Recreation.gov. Watches for availability, alerts users via email/SMS/push, and completes bookings automatically with browser automation. Includes Stripe subscription billing and iOS/Android apps via Capacitor.",
      techStack: [
        "React",
        "Node.js",
        "Firebase",
        "Playwright",
        "Stripe",
        "AWS",
        "Twilio",
      ],
      liveUrl: "https://campscout.tech",
    },
    {
      title: "AutoSocials",
      technology: "Full-Stack SaaS",
      icon: <FiShare2 />,
      description:
        "Social media automation SaaS that publishes video and photo content to Instagram, X, Facebook, Threads, and YouTube from a single submission — with scheduling, a unified comments/DM inbox, analytics, and zero-downtime Docker CI/CD with automatic rollback.",
      techStack: [
        "React",
        "TypeScript",
        "Node.js",
        "Firestore",
        "Redis",
        "FFmpeg",
        "Docker",
      ],
      liveUrl: "https://autosocials.work",
    },
    {
      title: "GainsIQ",
      technology: "iOS App",
      icon: <FiActivity />,
      description:
        "Offline-first iOS workout tracker with a research-backed progression coaching engine — estimated-1RM tracking, plateau detection, deload timing, and in-workout weight/rep suggestions. Local SQLite database, no accounts required.",
      techStack: ["React Native", "Expo", "TypeScript", "SQLite", "Drizzle ORM"],
    },
    {
      title: "Castle Killer",
      technology: "3D Game",
      icon: <FiTarget />,
      description:
        "3D castle-destruction artillery game with a custom multi-core Rust physics engine (Rapier3D) — support-graph collapse cascades, ragdoll soldiers, and destructible brick-by-brick castles. Ships as a native desktop/iOS app via Tauri with a hand-built AdMob plugin.",
      techStack: [
        "Rust",
        "Three.js",
        "Rapier3D",
        "Tauri",
        "WebAssembly",
        "Swift",
      ],
    },
    {
      title: "GRA Website",
      technology: "E-Commerce",
      icon: <FiShoppingBag />,
      description:
        "E-commerce and brand platform for the GRA apparel line: Shopify Storefront checkout, a real-time GraphQL admin CMS with role-based access and live updates over WebSockets, and custom WebGL shader visuals. Deployed to AWS with Terraform and GitHub Actions.",
      techStack: [
        "React",
        "TypeScript",
        "GraphQL",
        "Shopify",
        "Firebase",
        "AWS",
        "Terraform",
      ],
    },
    {
      title: "Asset Tag Scanner",
      technology: "Enterprise IT",
      icon: <FiCamera />,
      description:
        "Power Apps barcode-scanning app used during hardware refresh cycles — scans device asset tags and cross-references SharePoint to instantly flag which machines need cut sheets, including nonstandard-device and missing-inventory detection.",
      techStack: ["Power Apps", "SharePoint", "Power Fx", "Microsoft 365"],
    },
    {
      title: "Pong With Friends",
      technology: "watchOS Game",
      icon: <FiWatch />,
      description:
        "Native Apple Watch Pong with Digital Crown paddle control and real-time watch-to-watch multiplayer — host-authoritative netcode over Apple's Network framework, 60fps SwiftUI Canvas rendering, and haptic feedback.",
      techStack: ["Swift", "SwiftUI", "watchOS", "Network framework"],
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

              {project.liveUrl && (
                <LiveLink
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live <FiExternalLink />
                </LiveLink>
              )}
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
