import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import ChannelsAndUsers, { ChannelsAndUsersProps } from "./ChannelsAndUsers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ChannelsAndUsersDrawer: React.FC<Props & ChannelsAndUsersProps> = ({
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody p={0} m={0}>
          <ChannelsAndUsers width="100%" closeDrawer={onClose} {...props} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ChannelsAndUsersDrawer;
