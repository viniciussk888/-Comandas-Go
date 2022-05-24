import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidbarNav";

export function SideBar() {
  const { isOpen, onClose } = useSidebarDrawer()

  useEffect(()=>{
    const isAuth = JSON.parse(localStorage.getItem('@comandasgo'))
    if(!isAuth){
      Router.back();
    }
  },[])

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  if(isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  )
}