import { Theme } from "data/types";
import styled from "styled-components";
import { transition } from "styles/variables";

export const StyledApp = styled.div<{ theme: Theme }>`
  width: 100vw;
  overflow: hidden;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: ${transition.fast};
`;
