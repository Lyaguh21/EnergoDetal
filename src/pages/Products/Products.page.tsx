import { Box } from "@mantine/core";
import Search from "./components/Search";
import ListBlueprint from "./components/ListBlueprint";
import MainBigText from "../../widgets/Texts/MainBigText";
import { useEffect, useState } from "react";
import { Blueprint } from "../../entities/Blueprint.iterface";
import { API } from "../../app/helpers";
import axios from "axios";

export default function Products() {
  const [data, setData] = useState<Blueprint[]>([]);

  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [minDisplayTimePassed, setMinDisplayTimePassed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const startTime = Date.now();
      setLoading(true);
      setShowSkeleton(true);

      try {
        const response = await axios.get<Blueprint[]>(`${API}/products`);

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 1000;
        const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

        setTimeout(() => {
          setData(response.data || []);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        setTimeout(() => {
          setData([]);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box
      w="100%"
      h="100vh"
      px={{ base: 20, md: 100 }}
      style={{ overflow: "hidden" }}
    >
      <MainBigText> Продукция</MainBigText>

      <Search />

      <ListBlueprint showSkeleton={showSkeleton} data={data} />
    </Box>
  );
}
