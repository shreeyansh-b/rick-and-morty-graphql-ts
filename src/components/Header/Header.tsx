import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Image,
  Avatar,
  Text,
  Paper,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  Character,
  Characters as CharactersType,
  useCharactersQuery,
} from "generated/graphql";
import { filtersQueryGenerator } from "helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, ReactNode } from "react";
import { useBoundStore } from "store";

/* eslint-disable react/display-name */
const AutoCompleteItem = forwardRef<HTMLDivElement, Character>(
  ({ image, name, id }: Character, ref) => {
    const router = useRouter();
    const { query, asPath } = router;
    const pathname = asPath.split("?")[0]; // @https://github.com/vercel/next.js/discussions/33243#discussioncomment-2576346

    const onCardClickHandler = ({ id }: { id: number }) => {
      const urlQuery = filtersQueryGenerator({ ...query, id: String(id) });
      router.push({
        pathname: pathname,
        query: urlQuery,
      });
    };

    return (
      <div
        style={{ cursor: "pointer" }}
        ref={ref}
        onClick={() => onCardClickHandler({ id: Number(id) ?? 0 })}
      >
        <Paper>
          <Group noWrap>
            <Avatar src={image} />

            <div>
              <Text
                component="p"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "100%",
                  whiteSpace: "nowrap",
                }}
                size={"sm"}
                weight={"bold"}
              >
                {name}
              </Text>
            </div>
          </Group>
        </Paper>
      </div>
    );
  }
);

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
    width: "100%",
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
    width: "250px",
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

  const { name, addNameFilter } = useBoundStore();

  const [debouncedName] = useDebouncedValue<string>(name ?? "", 200);

  const { data, isLoading } = useCharactersQuery({
    name: debouncedName,
  });

  const { results } = (data?.characters as CharactersType) ?? {};

  const resultsDataArray =
    results?.map((result) => {
      const { id } = (result as Character) ?? {};
      return {
        value: id ?? "",
        ...result,
      };
    }) ?? [];

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group sx={{ width: "100%", justifyContent: "space-between" }}>
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
            placeholder="Search character"
            data={resultsDataArray ?? []}
            onChange={(value) => addNameFilter({ name: value })}
            itemComponent={AutoCompleteItem}
            value={name}
            filter={(value, item) => true} // <- @ https://github.com/mantinedev/mantine/discussions/822#discussioncomment-2146355
          />
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
        </Group>
      </div>
    </Header>
  );
}
