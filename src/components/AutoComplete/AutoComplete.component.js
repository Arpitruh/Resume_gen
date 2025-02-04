import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Input,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";

// Helper function to fetch random names
const fetchRandomUserNames = async () => {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?results=10&nat=in"
    );
    const data = await response.json();
    return data.results.map((user) => `${user.name.first} ${user.name.last}`);
  } catch (error) {
    console.error("Error fetching random Indian names:", error);
    return [];
  }
};

// Predefined job roles for suggestions
const jobRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Graphic Designer",
  "Product Manager",
  "Data Scientist",
  "Marketing Specialist",
  "HR Manager",
  "Web Developer",
  "UX/UI Designer",
  "Content Writer",
  "Project Manager",
  "Software Engineer",
  "Graphic Designer",
  "Product Manager",
  "Data Scientist",
  "Marketing Specialist",
  "HR Manager",
  "Web Developer",
  "UX/UI Designer",
  "Content Writer",
  "Project Manager",
  "DevOps Engineer",
  "Cloud Architect",
  "AI/ML Engineer",
  "Network Engineer",
  "Database Administrator",
  "Cybersecurity Analyst",
  "Game Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "Blockchain Developer",
  "Business Intelligence Analyst",
  "System Administrator",
  "Software Tester/QA Engineer",
  "Site Reliability Engineer (SRE)",
  "Embedded Systems Engineer",
  "Operations Manager",
  "Sales Manager",
  "Financial Analyst",
  "Product Marketing Manager",
  "Public Relations Specialist",
  "Customer Success Manager",
  "Legal Advisor",
  "Supply Chain Manager",
  "Content Strategist",
  "Digital Marketing Manager",
  "Event Coordinator",
  "Brand Manager",
  "Training and Development Specialist",
  "Recruiter/Talent Acquisition Specialist",
  "Administrative Assistant",
  "AI Research Scientist",
  "Data Analyst",
  "Product Owner",
  "Solutions Architect",
  "Technical Support Engineer",
  "SEO Specialist",
  "IT Consultant",
  "Automation Engineer",
  "Computer Vision Engineer",
  "Augmented Reality (AR) Developer",
  "Virtual Reality (VR) Developer",
  "Cloud Solutions Engineer",
  "Technology Evangelist",
  "Business Systems Analyst",
  "IoT (Internet of Things) Engineer",
  "Business Development Manager",
  "Client Relationship Manager",
  "Healthcare Administrator",
  "Compliance Officer",
  "Project Coordinator",
  "Financial Planner",
  "Retail Manager",
  "Insurance Specialist",
  "Public Affairs Specialist",
  "Corporate Communications Manager",
  "Creative Director",
  "Editorial Manager",
  "Real Estate Manager",
  "Community Manager",
  "Customer Service Representative",
];

// Predefined skills for suggestions
const skills = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Angular",
  "Vue.js",
  "Django",
  "Ruby on Rails",
  "Git",
  "Docker",
  "AWS",
  "SQL",
  "Machine Learning",
  "AI",
  "Data Analysis",
  "Project Management",
  // More skills...
];

const AutoComplete = ({ value, onChange, name }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      const names = await fetchRandomUserNames(); // Fetch names from RandomUser API
      setNames(names); // Save fetched names in the state
      setLoading(false);
    };

    fetchSuggestions();
  }, []);

  // Filter suggestions based on user input
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue); // Update the parent component state

    if (name === "role") {
      // If the field is "role", filter job roles
      if (inputValue) {
        const filteredRoles = jobRoles.filter((role) =>
          role.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filteredRoles);
      } else {
        setFilteredSuggestions([]);
      }
    } else if (name === "name") {
      // If the field is "name", filter names
      if (inputValue) {
        const filteredNames = names.filter((name) =>
          name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filteredNames);
      } else {
        setFilteredSuggestions([]);
      }
    } else if (name === "email") {
      // If the field is "email", suggest Gmail-related emails
      if (inputValue) {
        const filteredEmails = ["gmail.com", "yahoo.com", "outlook.com"]
          .filter((domain) => domain.includes(inputValue.toLowerCase()))
          .map((domain) => `${inputValue}@${domain}`);
        setFilteredSuggestions(filteredEmails);
      } else {
        setFilteredSuggestions([]);
      }
    } else if (name === "skill") {
      // If the field is "skill", filter skills
      if (inputValue) {
        const filteredSkills = skills.filter((skill) =>
          skill.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filteredSkills);
      } else {
        setFilteredSuggestions([]);
      }
    }
  };

  // Handle when a suggestion is clicked
  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setFilteredSuggestions([]); // Clear suggestions after selection
  };

  return (
    <FormControl position="relative">
      {/* Only show one label depending on the field name */}
      <FormLabel htmlFor={name}>
        {name === "name"
          ? "Enter Full Name"
          : name === "role"
          ? "Enter Job Role"
          : name === "skill"
          ? "Enter Skill"
          : "Enter your Email"}
      </FormLabel>

      <Input
        value={value}
        onChange={handleChange}
        name={name}
        id={name}
        variant="filled"
        placeholder={
          name === "name"
            ? "Enter Full Name"
            : name === "role"
            ? "Enter Job Role"
            : name === "skill"
            ? "Enter Skill"
            : "Enter your Email"
        }
        _placeholder={{ opacity: 1 }} // Prevent placeholder from disappearing on focus
      />

      {loading ? (
        <List mt={2}>
          <ListItem>Loading suggestions...</ListItem>
        </List>
      ) : (
        filteredSuggestions.length > 0 && (
          <Box
            position="absolute"
            top="100%"
            left="0"
            width="100%"
            zIndex="10"
            border="1px"
            borderColor="gray.300"
            backgroundColor="white"
            boxShadow="md"
          >
            <List spacing={1} mt={2}>
              {filteredSuggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  p={2}
                  cursor="pointer"
                  _hover={{ backgroundColor: "gray.100" }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </ListItem>
              ))}
            </List>
          </Box>
        )
      )}
    </FormControl>
  );
};

export default AutoComplete;
