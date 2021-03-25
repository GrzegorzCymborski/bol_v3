import React from "react";
import { useQuery } from "react-query";
import { fetchOffers } from "../../API";
import { useAppSelector } from "../../hooks/reduxHooks";
import Sellers from "../sellers/Sellers";

type ExpandedRowProps = {
  offerUrl: string;
};

const ExpandedRow: React.FC<ExpandedRowProps> = ({
  offerUrl,
}: ExpandedRowProps) => {
  const { userAuthID } = useAppSelector((state) => state.user);

  const fetchMoreQuery = useQuery(
    "fetch more sellers",
    () => fetchOffers(userAuthID!, offerUrl),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: arrWithSellers } = fetchMoreQuery;
  return <Sellers xs="6" md="4" offers={arrWithSellers} />;
};

export default ExpandedRow;
