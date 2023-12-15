// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";
import {Container, Wrap, MainWrap} from "./LayoutStyles";

// eslint-disable-next-line @typescript-eslint/naming-convention
import Nav from "../nav/Nav";
import {NavWrap} from "../nav/NavStyles";
// eslint-disable-next-line @typescript-eslint/naming-convention
import Footer from "../footer/Footer";

interface LayoutProps {
	children?: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
	return (
		<>
			<Container>
				<NavWrap>
					<Nav />
				</NavWrap>
				<Wrap>
					<MainWrap>{children}</MainWrap>
				</Wrap>
			</Container>
			<Footer />
		</>
	);
};

export default Layout;
