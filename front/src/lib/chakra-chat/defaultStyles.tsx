export const CHAT_CONTAINER_STYLE = {
  bg: "brand.primary.100",
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
  },
  image: {
    w: "70px",
    h: "70px",
    mx: "8px",
    mt: "10px",
    borderRadius: BORDER_RADIUS_PETIT,
  },
  general: {
    p: "15px",
    color: "#fff",
    flex: 1,
  },
  left: {
    bg: "brand.primary.300",
    borderRadius: BORDER_RADIUS_BIG,
    borderBottomLeftRadius: BORDER_RADIUS_PETIT,
    maxW: "350px",
  },
  right: {
    bg: "brand.primary.300",
    borderRadius: BORDER_RADIUS_BIG,
    borderBottomRightRadius: BORDER_RADIUS_PETIT,
    ml: "29px",
    maxW: "350px",
  },
};

export const DATE_WRAPPER_STYLE = {
  display: "flex",
  justifyContent: "center",
  my: "24px",
};

export const DATE_TEXT_STYLE = {
  fontSize: "12px",
  fontWeight: "600",
  lineHeight: "16px",
  color: "brand.primary.700",
};

export const INPUT_BAR_STYLE = {
  wrapper: {
    bg: "brand.primary.500",
    px: "16px",
  },
  inputbar: {
    bg: "#FFF",
    borderRadius: "20px",
    overflow: "hidden",
  },
  image: {
    w: "50px",
    h: "50px",
    mx: "15px",
    mb: "15px",
    mt: "10px",
    borderRadius: BORDER_RADIUS_PETIT,
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
  bg: "brand.primary.500",
  py: "20px",
  px: "16px",
  color: "white",
};

export const HEADER_AVATAR_STYLE = {
  h: "32px",
  w: "32px",
};
