import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./providers/UserProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Topbar from "@/components/Nav/Topbar";
import { SmallSidebar } from "@/components/Nav/SmallSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster />
				<TooltipProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<UserProvider>
							<Topbar />
							<div
								className="relative top-14 overflow-auto flex w-screen"
								style={{
									height: "calc(100vh - 56px)",
								}}
							>
								<SmallSidebar />
								<div>{children}</div>
							</div>
						</UserProvider>
					</ThemeProvider>
				</TooltipProvider>
			</body>
		</html>
	);
}
