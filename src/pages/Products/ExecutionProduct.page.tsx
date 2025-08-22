import { Anchor, Box, Breadcrumbs, Flex, Text } from "@mantine/core";
import { useParams } from "react-router";
import { Execution } from "../../entities/Execution.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../app/helpers";
import ExecutionTemplate from "./components/tempaltes/ExecutionTemplate";

interface dataRequest {
  name: string;
  description: string;
  execution: Execution[];
}

export default function ExecutionProduct() {
  const { BlueprintId } = useParams();
  const [data, setData] = useState<dataRequest | null>(null);

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
        const response = await axios.get<dataRequest>(
          `${API}/products/${BlueprintId}`
        );

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 1000;
        const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

        setTimeout(() => {
          setData(response.data);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        setTimeout(() => {
          setData(null);
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

  const items = [
    { title: "Продукция", href: "/products" },
    { title: data?.name, href: `/products/${BlueprintId}` },
  ].map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      c={index === 1 ? "#000" : "#515661"}
      fz={20}
      fw="500"
    >
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Flex px={20} h={90} w="100%" align="center">
        <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
      </Flex>
      <Box px={20}>
        <Text fz={64} fw="bold">
          {data?.name}
        </Text>
        <Text fz={28} c="#515661" mb={30}>
          {data?.description}
        </Text>
        <Text fz={28} mb={20} fw="bold">
          Исполнения
        </Text>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
            width: "100%",
          }}
        >
          {data?.execution.map((el) => (
            <ExecutionTemplate data={el} />
          ))}
        </Box>
      </Box>
    </>
  );
}
