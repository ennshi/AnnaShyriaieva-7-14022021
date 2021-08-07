// import colors, { colorsGradient } from '../../themes/mainTheme/colors'
// import { FONT_FAMILY } from '../../themes/mainTheme/textStyles'

export const CHAT_CONTAINER_STYLE = {
  bg: "white",
};

export const MESSAGE_CONTAINER_STYLE = {
  p: "16px",
};

const BORDER_RADIUS_BIG = "16px";
const BORDER_RADIUS_PETIT = "4px";

export const BUBBLE_STYLE = {
  text: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "24px",
    // fontFamily: FONT_FAMILY.SOURCE_SANS_PRO,
  },
  general: {
    p: "15px",
    color: "#fff",
    flex: 1,
  },
  left: {
    bg: "#AED6F1",
    borderRadius: BORDER_RADIUS_BIG,
    borderBottomLeftRadius: BORDER_RADIUS_PETIT,
    maxW: "240px",
  },
  right: {
    bg: "#7DCEA0",
    borderRadius: BORDER_RADIUS_BIG,
    borderBottomRightRadius: BORDER_RADIUS_PETIT,
    ml: "29px",
  },
};

export const DATE_WRAPPER_STYLE = {
  display: "flex",
  justifyContent: "center",
  my: "24px",
};

export const DATE_TEXT_STYLE = {
  // color: colors.text.tertiary,
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "16px",
  // fontFamily: FONT_FAMILY.SOURCE_SANS_PRO,
};

export const INPUT_BAR_STYLE = {
  wrapper: {
    bg: "#7DCEA0",
    px: "16px",
  },
  inputbar: {
    bg: "#AED6F1",
    borderRadius: "20px",
    overflow: "hidden",
  },
};

export const AVATAR_STYLE = {
  h: "24px",
  w: "24px",
};

export const TEXTAREA_PROPS = {
  minRows: 1,
  maxRows: 6,
};

export const HEADER_CONTAINER_STYLE = {
  bg: "#AED6F1",
  py: "20px",
};

export const HEADER_AVATAR_STYLE = {
  h: "32px",
  w: "32px",
};
