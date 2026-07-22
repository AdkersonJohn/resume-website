import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--nav-bg);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--hairline);
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(22, 22, 23, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    transform: ${({ isOpen }) =>
      isOpen ? "translateY(0)" : "translateY(-100%)"};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: all 0.3s ease;
  }
`;

const NavLink = styled.a`
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--text);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: var(--text);

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: isScrolled
          ? "rgba(22, 22, 23, 0.94)"
          : "rgba(22, 22, 23, 0.8)",
      }}
    >
      <Nav>
        <Logo>John Adkerson</Logo>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink onClick={() => scrollToSection("about")}>About</NavLink>
          <NavLink onClick={() => scrollToSection("experience")}>
            Experience
          </NavLink>
          <NavLink onClick={() => scrollToSection("skills")}>Skills</NavLink>
          <NavLink onClick={() => scrollToSection("projects")}>
            Projects
          </NavLink>
          <NavLink onClick={() => scrollToSection("education")}>
            Education
          </NavLink>
          <NavLink onClick={() => scrollToSection("contact")}>Contact</NavLink>
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
