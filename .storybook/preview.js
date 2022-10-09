import { addDecorator } from "@storybook/react";
import { createGlobalStyle, ThemeProbider } from "styled-components";
import { theme } from "../src/themes";
import * as NextImage from "next/image";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fria Sans, Driod Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    transition: .25s;
    color: #000000;
  }
`;

// themeの適用
addDecorator((story) => (
  <ThemeProbider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProbider>
));

// next/imageの差し替え (next/imageは画像を最適化してくれるが、storybook上では動作しないので、強制的に通常の画像を差し替える)
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "defualt", {
  configurable: true,
  value: (props) =>
    typeof props.src === "string" ? (
      <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextImage {...props} unoptimized />
    ),
});

Object.defineProperty(NextImage, "__esModule", {
  configurable: true,
  value: true,
});
