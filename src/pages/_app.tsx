import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "theme/theme";
import { AppShell, Container, MantineProvider } from "@mantine/core";
import { Header } from "components/Header";

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
          </Container>
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
