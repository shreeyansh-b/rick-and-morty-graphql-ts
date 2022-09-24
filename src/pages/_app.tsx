import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppShell, Container, MantineProvider } from "@mantine/core";
import { Header } from "components/Header";
import CharacterById from "./character/[id]";
import "../styles/global.css"; // <- scroll issue on modal opening https://github.com/vercel/next.js/issues/28778#issuecomment-1065958281

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
          fontFamily: "Quicksand, sans-serif",
        }}
      >
        <AppShell
          header={
            <Header
              links={[
                {
                  label: "Characters",
                  link: "/characters",
                },
              ]}
            />
          }
        >
          <Container>
            <Component {...pageProps} />
            <CharacterById />{" "}
            {/* ^^^^^ adding this at app level so that there can be character modal when user visits query param ?id={int} else it'll only mount for "/character/{id}"  */}
          </Container>
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
