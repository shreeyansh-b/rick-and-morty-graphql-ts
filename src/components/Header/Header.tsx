import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

export function HeaderSearch({ links }: HeaderSearchProps) {
  const { classes } = useStyles();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a className={classes.link}>{link.label}</a>
    </Link>
  ));

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Group>
            <Link key="home" href="/">
              <a>
                <Image
                  width={110}
                  src={"/assets/svgs/Rick_and_Morty.svg"}
                  alt="Rick And Morty"
                />
              </a>
            </Link>
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
          />
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
        </Group>
      </div>
    </Header>
  );
}
