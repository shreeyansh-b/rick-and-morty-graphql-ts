import React, { useEffect, useMemo } from "react";
import {
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Navbar as MantineNavbar,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  getColorFromGender,
  getColorFromStatus,
  GenderType,
  StatusType,
} from "components/CharacterCard/CharacterCard";
import { genders, statuses } from "constants/ProjectConstants";
import { useBoundStore } from "store";
import { filtersQueryGenerator } from "helpers";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const VALID_KEYS_ARRAY = ["gender", "status"];

export const Navbar: React.FC<{}> = () => {
  const gendersArray = Object.values(genders);
  const statusesArray = Object.values(statuses);

  const { addGenderFilter, addStatusFilter, clearAllFilters, gender, status } =
    useBoundStore();

  const router = useRouter();
  const { asPath, query } = router;
  let pathname = asPath.split("?")[0]; // @https://github.com/vercel/next.js/discussions/33243#discussioncomment-2576346

  pathname = pathname.split("/page/")[1]
    ? pathname.split("/page/")[0] + "/page/1"
    : pathname;

  const setQueryInStore = ({ query }: { query: ParsedUrlQuery }) => {
    const queryKeysArray = Object.keys(query); // <- this is from URL

    VALID_KEYS_ARRAY.forEach((validKey) => {
      // checking if url keys contain gender or status
      if (queryKeysArray.includes(validKey)) {
        if (validKey === VALID_KEYS_ARRAY[0]) {
          addGenderFilter({ gender: query[VALID_KEYS_ARRAY[0]] as GenderType });
        }
        if (validKey === VALID_KEYS_ARRAY[1]) {
          addStatusFilter({ status: query[VALID_KEYS_ARRAY[1]] as StatusType });
        }
      }
    });
  };

  const clearQueryInStore = ({ query }: { query: ParsedUrlQuery }) => {
    const queryKeysArray = Object.keys(query); // <- this is from URL
    if (
      !queryKeysArray.some((queryKey) => VALID_KEYS_ARRAY.includes(queryKey)) ||
      !queryKeysArray.length
    ) {
      clearAllFilters();
    }
  };

  const clearQueryHandler = () => {
    router.push({
      pathname: pathname,
    });
  };

  const genderFilterClickHandler = ({ gender }: { gender: GenderType }) => {
    const urlQuery = filtersQueryGenerator({ ...query, gender }); // <- spreading current url query here, so that new filter gets appended to current query else it'll replace the entire url query

    //   replacing page as 0, cause there can only be 1 page for specific filter, so resetting it to 0
    router.push({
      pathname: pathname,
      query: urlQuery,
    });
  };

  const statusFilterClickHandler = ({ status }: { status: StatusType }) => {
    const urlQuery = filtersQueryGenerator({ ...query, status });
    router.push({
      pathname: pathname,
      query: urlQuery,
    });
  };

  useEffect(() => {
    setQueryInStore({ query });
    clearQueryInStore({ query });
  }, [query]);

  return (
    <MantineNavbar width={{ base: 300 }} p={"md"}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
            width: "100%",
          }}
        >
          <Text component="p" size={"md"} weight={"bold"}>
            Filters
          </Text>
          {Boolean(status || gender) && (
            <Button variant="subtle" compact onClick={clearQueryHandler}>
              Clear
            </Button>
          )}
        </Container>
        <Group sx={{ gap: "10px" }}>
          {Boolean(gender) && (
            <Badge
              color={getColorFromGender({
                gender: (gender as GenderType) ?? "",
              })}
              variant="light"
              size="sm"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                genderFilterClickHandler({
                  gender: (gender as GenderType) ?? "",
                })
              }
            >
              {gender}
            </Badge>
          )}

          {Boolean(status) && (
            <Badge
              color={getColorFromStatus({
                status: (status as StatusType) ?? "",
              })}
              variant="light"
              size="sm"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                statusFilterClickHandler({
                  status: (status as StatusType) ?? "",
                });
              }}
            >
              {status}
            </Badge>
          )}
        </Group>
        <Divider
          mt={Boolean(status || gender) ? "md" : 0}
          sx={{ width: "100%" }}
        />

        <Text component="p" size={"sm"} weight={"bold"}>
          Gender
        </Text>
        <Group sx={{ gap: "10px" }}>
          {gendersArray.map((gender, index) => (
            <Tooltip
              key={`gender_${index}_${gender}`}
              label={`Filter by ${gender}`}
            >
              <Badge
                color={getColorFromGender({
                  gender: (gender as GenderType) ?? "",
                })}
                variant="light"
                size="sm"
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  genderFilterClickHandler({
                    gender: (gender as GenderType) ?? "",
                  })
                }
              >
                {gender}
              </Badge>
            </Tooltip>
          ))}
        </Group>

        <Divider sx={{ width: "100%" }} mt={"md"} />

        <Text component="p" size={"sm"} weight={"bold"}>
          Status
        </Text>
        <Group sx={{ gap: "10px" }}>
          {statusesArray.map((status, index) => (
            <Tooltip
              key={`status_${index}_${status}`}
              label={`Filter by ${status}`}
            >
              <Badge
                color={getColorFromStatus({
                  status: (status as StatusType) ?? "",
                })}
                variant="light"
                size="sm"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  statusFilterClickHandler({
                    status: (status as StatusType) ?? "",
                  });
                }}
              >
                {status}
              </Badge>
            </Tooltip>
          ))}
        </Group>
      </Container>
    </MantineNavbar>
  );
};
