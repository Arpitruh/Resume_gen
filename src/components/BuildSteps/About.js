import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useResume } from "../../Context";
import ImageUpload from "../ImageUploadButton/ImageUpload.component";
import AutoComplete from "../AutoComplete/AutoComplete.component";

const About = () => {
  const { about, setAbout } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const handleNameChange = (value) => {
    setAbout({ ...about, name: value });
  };

  const handleRoleChange = (value) => {
    setAbout({ ...about, role: value });
  };

  return (
    <>
      <Stack spacing={4} mb={2}>
        {about.picture ? (
          <Button
            onClick={() => {
              setAbout({ ...about, picture: "" });
            }}
            colorScheme="red"
            variant="outline"
          >
            Remove Image
          </Button>
        ) : (
          <ImageUpload />
        )}

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            {/* Using AutoComplete for Full Name */}
            <AutoComplete
              value={about.name}
              onChange={handleNameChange}
              name="name"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="role">Role</FormLabel>
            {/* Using AutoComplete for Role */}
            <AutoComplete
              value={about.role}
              onChange={handleRoleChange}
              name="role"
            />
          </FormControl>
        </HStack>

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="email"
              id="email"
              type="email"
              variant="filled"
              placeholder="Email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="phone"
              id="phone"
              type="tel"
              variant="filled"
              placeholder="Phone"
            />
          </FormControl>
        </HStack>

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="address"
              id="address"
              type="text"
              variant="filled"
              placeholder="Address"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="linkedin"
              id="linkedin"
              type="url"
              variant="filled"
              placeholder="https://linkedin.com"
            />
          </FormControl>
        </HStack>
      </Stack>
    </>
  );
};

export default About;
