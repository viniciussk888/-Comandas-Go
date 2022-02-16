import { Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiShoppingCart2Line,RiFileList3Line, RiFileCopy2Line, RiHandCoinLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav () {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiFileCopy2Line} href="/comandas">Comandas</NavLink>
       {/*  <NavLink icon={RiFileCopy2Line} href="/dashboard">Dashboard</NavLink> */}
        <NavLink icon={RiShoppingCart2Line} href="/products">Produtos</NavLink>
      </NavSection>
      <NavSection title="FINANCEIRO">
        <NavLink icon={RiHandCoinLine} href="/caixa">Caixa</NavLink>
        <NavLink icon={RiFileList3Line} href="/reports">Relatórios</NavLink>
      </NavSection>
    </Stack>
  )
}