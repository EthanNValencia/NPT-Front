import React from "react";
import {
  Body,
  Html,
  Head,
  Container,
  Tailwind,
  Text,
  Button,
  Img,
  Heading,
  Hr,
} from "@react-email/components";

const NssEmail = (props) => {
  const { test } = props;
  return (
    <Html>
      <Tailwind>
        <Head className=""></Head>
        <Body className="bg-gray-700 text-white">
          <Container className="p-8 rounded-lg shadow-lg bg-gray-600">
            <Container className="mx-auto rounded-lg border shadow-lg  w-fit p-2">
              <Img
                className=""
                src="https://github.com/EthanNValencia/calculator/blob/master/images/Nephew2.1Small.png?raw=true"
                alt="My Image"
              ></Img>
            </Container>
            <Hr className="border-2" />
            <Heading className="text-xl pt-4 text-center ">
              Welcome to Nephew Software Solutions! {test}
            </Heading>
            <Text className="text-xs text-center">
              This is an NSS email template.
            </Text>
            <Container className="">
              <Button
                href="https://www.google.com/"
                className="mr-2 px-4 py-2 font-extrabold text-sm shadow-xl rounded-md text-white bg-red-700 cursor-pointer"
              >
                Google!
              </Button>
              <Button
                href="https://www.facebook.com"
                className="px-4 py-2 font-extrabold text-sm shadow-xl rounded-md text-white bg-red-700 cursor-pointer"
              >
                Facebook!
              </Button>
            </Container>
            <Container className="">
              <Text className="">So cool!</Text>
              <Text className="">Yeah!</Text>
            </Container>
            <Hr className="border-2" />
            <Container className="">
              <Text className="text-center font-bold">
                By Nephew Software Solutions
              </Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NssEmail;
